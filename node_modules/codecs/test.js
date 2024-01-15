const test = require('brittle')
const c = require('compact-encoding')
const codecs = require('./')

test('json', function (t) {
  const enc = codecs('json')
  t.alike(enc.name, 'json')
  t.alike(enc.encode({}), Buffer.from('{}'))
  t.alike(enc.decode(Buffer.from('{}')), {})
})

test('utf-8', function (t) {
  const enc = codecs('utf-8')
  t.alike(enc.name, 'utf-8')
  t.alike(enc.encode('hello world'), Buffer.from('hello world'))
  t.alike(enc.decode(Buffer.from('hello world')), 'hello world')
})

test('hex', function (t) {
  const enc = codecs('hex')
  t.alike(enc.name, 'hex')
  t.alike(enc.encode('abcd'), Buffer.from([0xab, 0xcd]))
  t.alike(enc.decode(Buffer.from([0xab, 0xcd])), 'abcd')
})

test('binary', function (t) {
  const enc = codecs()
  t.alike(enc.name, 'binary')
  const input = Buffer.from('hello world')
  t.alike(enc.encode('hello world'), input)
  t.alike(enc.encode(input), input)
  t.alike(enc.decode(input), input)
  const uint8 = new Uint8Array(input.buffer, input.byteOffset, input.byteLength)
  t.ok(Buffer.isBuffer(enc.encode(uint8)))
  t.alike(enc.encode(uint8).compare(input), 0)
  t.ok(Buffer.isBuffer(enc.decode(uint8)))
  t.alike(enc.decode(uint8).compare(input), 0)
})

test('custom', function (t) {
  const enc = codecs({
    name: 'custom',
    encode: function () {
      return Buffer.from('lol')
    },
    decode: function () {
      return 42
    }
  })

  t.alike(enc.name, 'custom')
  t.alike(enc.encode('hello'), Buffer.from('lol'))
  t.alike(enc.encode(42), Buffer.from('lol'))
  t.alike(enc.decode(Buffer.from('lol')), 42)
})

test('uint8arrays in binary', function (t) {
  const enc = codecs('binary')
  const buf = enc.encode(new Uint8Array([1, 2, 3]))
  t.alike(buf, Buffer.from([1, 2, 3]))
})

test('custom fallback', function (t) {
  t.alike(codecs('baseless', null), null)
  const custom = { decode: function () {}, encode: function () {} }
  t.alike(codecs('baseless', custom), custom)
})

test('compact encoding', function (t) {
  const uint = codecs(c.uint)
  t.alike(uint.encode(4), Buffer.from([4]))
  t.alike(uint.encode(1000), Buffer.from([253, 232, 3]))
  t.alike(uint.decode(Buffer.from([4])), 4)
  t.alike(uint.decode(Buffer.from([253, 232, 3])), 1000)
})
