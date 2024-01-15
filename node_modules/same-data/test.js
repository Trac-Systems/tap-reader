const test = require('brittle')
const sameData = require('./')

test('basic', function (t) {
  t.is(sameData(1, 1), true)
  t.is(sameData(1, 2), false)
  t.is(sameData(), true) // undef undef
  t.is(sameData(true, true), true)
  t.is(sameData('true', true), false)
  t.is(sameData('true', 'true'), true)
})

test('objects', function (t) {
  t.is(sameData({ foo: 1 }, { foo: 1 }), true)
  t.is(sameData({ foo: 1 }, { foo: 1, bar: true }), false)
  t.is(sameData({ foo: 1, nested: { a: 1 } }, { foo: 1, nested: { a: 1 } }), true)
  t.is(sameData([{ a: 1 }, { b: 1 }], [{ a: 1 }, { b: 1 }]), true)
})

test('typed arrays', function (t) {
  t.is(sameData(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3])), true)
  t.is(sameData(new Uint8Array([1, 2, 1]), new Uint8Array([1, 2, 3])), false)
})

test('buffers', function (t) {
  t.is(sameData(Buffer.from([1, 2, 3]), Buffer.from([1, 2, 3])), true)
  t.is(sameData(Buffer.from([1, 2, 1]), Buffer.from([1, 2, 3])), false)
})
