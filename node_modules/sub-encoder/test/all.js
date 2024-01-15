const test = require('brittle')

const Hypercore = require('hypercore')
const Hyperbee = require('hyperbee')
const IndexEncoder = require('index-encoder')
const ram = require('random-access-memory')
const b = require('b4a')

const SEP = b.alloc(1)

const SubEncoder = require('..')

test('simple sub key encoding', t => {
  const enc = new SubEncoder()
  const sub1 = enc.sub('a')
  const sub2 = sub1.sub('b')

  const key = b.alloc(1).fill(1)
  const k1 = enc.encode(key)
  const k2 = sub1.encode(key)
  const k3 = sub2.encode(key)

  t.alike(k1, key)
  t.alike(k2, b.concat([b.from('a'), SEP, key]))
  t.alike(k3, b.concat([b.from('a'), SEP, b.from('b'), SEP, key]))

  t.alike(key, enc.decode(k1))
  t.alike(key, sub1.decode(k2))
  t.alike(key, sub2.decode(k3))
})

test('sub key encoding with hyperbee', async t => {
  const bee = new Hyperbee(new Hypercore(ram))
  const enc = new SubEncoder()

  const sub1 = enc.sub('hello', { keyEncoding: 'utf-8' })
  const sub2 = enc.sub('world')

  await bee.put('a', b.from('a'), { keyEncoding: sub1 })
  await bee.put('b', b.from('b'), { keyEncoding: sub2 })

  const n1 = await bee.get('a', { keyEncoding: sub1 })
  const n2 = await bee.get('b', { keyEncoding: sub2 })

  t.is(n1.key, 'a')
  t.alike(n1.value, b.from('a'))
  t.alike(n2.key, b.from('b'))
  t.alike(n2.value, b.from('b'))
})

test('sub range encoding with hyperbee', async t => {
  const bee = new Hyperbee(new Hypercore(ram), { valueEncoding: 'utf-8' })

  const enc = new SubEncoder(null, 'utf-8')
  const subA = enc.sub('sub-a', 'utf-8')
  const subB = enc.sub('sub-b', 'utf-8')
  const subC = enc.sub('sub-c', 'utf-8')

  await bee.put(enc.encode('d1'), 'd2')
  await bee.put(subA.encode('a1'), 'a1')
  await bee.put(subB.encode('b1'), 'b1')
  await bee.put(subB.encode('b2'), 'b2')
  await bee.put(subB.encode('b3'), 'b3')
  await bee.put(subC.encode('c1'), 'c1')

  {
    const range = { lt: 'sub' }
    const nodes = await collect(bee.createReadStream(range, { keyEncoding: enc }))
    t.is(nodes.length, 1)
    t.is(nodes[0].key, 'd1')
  }

  {
    const range = {}
    const nodes = await collect(bee.createReadStream(range, { keyEncoding: subA }))
    t.is(nodes.length, 1)
    t.is(nodes[0].key, 'a1')
  }

  {
    const range = { gt: 'b1', lt: 'b3' }
    const nodes = await collect(bee.createReadStream(range, { keyEncoding: subB }))
    t.is(nodes.length, 1)
    t.is(nodes[0].key, 'b2')
  }
})

test('sub range diff encoding with hyperbee', async t => {
  const bee = new Hyperbee(new Hypercore(ram), { valueEncoding: 'utf-8' })

  const enc = new SubEncoder(null, 'utf-8')
  const subA = enc.sub('sub-a', 'utf-8')
  const subB = enc.sub('sub-b', 'utf-8')
  const subC = enc.sub('sub-c', 'utf-8')

  await bee.put(enc.encode('d1'), 'd2')
  await bee.put(subA.encode('a1'), 'a1')
  await bee.put(subB.encode('b1'), 'b1')
  await bee.put(subB.encode('b2'), 'b2')
  await bee.put(subB.encode('b3'), 'b3')
  await bee.put(subC.encode('c1'), 'c1')

  {
    const range = { lt: 'sub' }
    const nodes = await collect(bee.createDiffStream(0, range, { keyEncoding: enc }))
    t.is(nodes.length, 1)
    t.is(nodes[0].left.key, 'd1')
  }

  {
    const range = {}
    const nodes = await collect(bee.createDiffStream(0, range, { keyEncoding: subA }))
    t.is(nodes.length, 1)
    t.is(nodes[0].left.key, 'a1')
  }

  {
    const range = { gt: 'b1', lt: 'b3' }
    const nodes = await collect(bee.createDiffStream(0, range, { keyEncoding: subB }))
    t.is(nodes.length, 1)
    t.is(nodes[0].left.key, 'b2')
  }
})

test('supports the empty sub', async t => {
  const bee = new Hyperbee(new Hypercore(ram))
  const enc = new SubEncoder()

  const sub1 = enc.sub('1', 'utf-8')
  const sub2 = enc.sub('2', 'utf-8')
  const sub3 = enc.sub()

  await bee.put('', b.from('a'), { keyEncoding: sub1 })
  await bee.put('', b.from('b'), { keyEncoding: sub2 })
  await bee.put(b.alloc(1), b.from('c'), { keyEncoding: sub3 })

  const n3 = await collect(bee.createReadStream({ keyEncoding: sub3 }))

  t.is(n3.length, 1)
  t.alike(n3[0].key, b.alloc(1))
})

test('supports the empty sub on top of another sub', async t => {
  const bee = new Hyperbee(new Hypercore(ram))
  const enc = new SubEncoder()

  const sub1 = enc.sub('1', 'utf-8')
  const subSubEmpty = sub1.sub()
  const subSub1 = sub1.sub('not empty', 'utf-8')

  await bee.put('', 'sub1 Entry', { keyEncoding: sub1 })
  await bee.put('', 'subSub1 Entry', { keyEncoding: subSub1 })
  await bee.put(b.alloc(1), 'EmptySubsub entry', { keyEncoding: subSubEmpty })

  const n3 = await collect(bee.createReadStream({ keyEncoding: subSubEmpty }))

  t.is(n3.length, 1)
  t.alike(n3[0].key, b.alloc(1))
})

test('empty str is a valid prefix, causing no overlap', async t => {
  const bee = new Hyperbee(new Hypercore(ram))
  const enc = new SubEncoder()

  const sub1 = enc.sub('', 'utf-8')
  const sub2 = enc.sub('other', 'utf-8')

  await bee.put('hey', 'ho', { keyEncoding: sub1 })
  await bee.put('not', 'a part', { keyEncoding: sub2 })
  const res = await collect(bee.createReadStream({ keyEncoding: sub1 }))
  t.is(res.length, 1)
  t.alike(res[0].key, 'hey')
})

test('can read out the empty key in subs', async t => {
  const bee = new Hyperbee(new Hypercore(ram))
  const enc = new SubEncoder()

  const sub1 = enc.sub('1', 'utf-8')
  const sub2 = enc.sub('2', 'utf-8')
  const sub3 = enc.sub('3', 'binary')

  await bee.put('', b.from('a'), { keyEncoding: sub1 })
  await bee.put('', b.from('b'), { keyEncoding: sub2 })
  await bee.put(b.alloc(1), b.from('c'), { keyEncoding: sub3 })

  const n1 = await collect(bee.createReadStream({ keyEncoding: sub1 }))
  const n2 = await collect(bee.createReadStream({ keyEncoding: sub2 }))
  const n3 = await collect(bee.createReadStream({ keyEncoding: sub3 }))

  t.is(n1[0].key, '')
  t.is(n2[0].key, '')
  t.alike(n3[0].key, b.alloc(1))
})

test('sub + index + hyperbee combo', async t => {
  const root = new SubEncoder()
  const enc = {
    keyEncoding: root.sub(b.from([1]), {
      keyEncoding: new IndexEncoder([
        IndexEncoder.UINT,
        IndexEncoder.STRING
      ])
    }),
    valueEncoding: 'utf-8'
  }
  const bee = new Hyperbee(new Hypercore(ram))

  await bee.put([1, 'a'], 'a', enc)
  await bee.put([1, 'b'], 'b', enc)
  await bee.put([2, 'aa'], 'aa', enc)
  await bee.put([2, 'bb'], 'bb', enc)
  await bee.put([3, 'aaa'], 'aaa', enc)
  await bee.put([3, 'bbb'], 'bbb', enc)

  const expectedKeys = [[2, 'aa'], [2, 'bb']]
  for await (const node of bee.createReadStream({ gt: [1], lt: [3] }, enc)) {
    t.alike(node.key, expectedKeys.shift())
  }
  t.is(expectedKeys.length, 0)
})

test('constructor-specified sub equivalent to calling .sub()', async t => {
  const directSub = new SubEncoder('mysub', 'utf-8')
  const roundaboutSub = (new SubEncoder()).sub('mysub', 'utf-8')
  t.alike(directSub, roundaboutSub)
})

async function collect (ite) {
  const res = []
  for await (const node of ite) {
    res.push(node)
  }
  return res
}
