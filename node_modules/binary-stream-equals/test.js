const test = require('brittle')
const { Readable } = require('streamx')
const streamEquals = require('./')

test('two exactly equal streams', async function (t) {
  const a = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjov')
  ])

  const b = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjov')
  ])

  const eq = await streamEquals(a, b)

  t.is(eq, true)
})

test('two exactly unequal streams', async function (t) {
  const a = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjov')
  ])

  const b = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjow')
  ])

  const eq = await streamEquals(a, b)

  t.is(eq, false)
})

test('first block is different', async function (t) {
  const a = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjov')
  ])

  const b = Readable.from([
    Buffer.from('xbe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjov')
  ])

  const eq = await streamEquals(a, b)

  t.is(eq, false)
})

test('two equal streams', async function (t) {
  const a = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjov')
  ])

  const b = Readable.from([
    Buffer.from('abef'),
    Buffer.from('es'),
    Buffer.from('t'),
    Buffer.from('e'),
    Buffer.from('rsjov')
  ])

  const eq = await streamEquals(a, b)

  t.is(eq, true)
})

test('two unequal streams', async function (t) {
  const a = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjov')
  ])

  const b = Readable.from([
    Buffer.from('abef'),
    Buffer.from('es'),
    Buffer.from('t'),
    Buffer.from('e'),
    Buffer.from('rsjow')
  ])

  const eq = await streamEquals(a, b)

  t.is(eq, false)
})

test('one stream shorter than the other', async function (t) {
  const a = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjov')
  ])

  const b = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er')
  ])

  const eq = await streamEquals(a, b)

  t.is(eq, false)
})

test('second stream is stream shorter than the other', async function (t) {
  const a = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er')
  ])

  const b = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjov')
  ])

  const eq = await streamEquals(a, b)

  t.is(eq, false)
})

test('one fails', async function (t) {
  const a = Readable.from([
    Buffer.from('abe'),
    Buffer.from('fest'),
    Buffer.from('er'),
    Buffer.from('sjov')
  ])

  const b = Readable.from([
    Buffer.from('abef'),
    Buffer.from('es'),
    Buffer.from('t'),
    Buffer.from('e'),
    Buffer.from('rsjov')
  ])

  b.destroy(new Error('stop'))

  t.exception(streamEquals(a, b))
})
