const test = require('brittle')
const BigSparseArray = require('./')

test('basic', function (t) {
  const b = new BigSparseArray()

  b.set(42, true)
  t.is(b.get(42), true)

  b.set(42, 42)
  t.is(b.get(42), 42)

  b.set(42424242424242, 'big')
  t.is(b.get(42424242424242), 'big')
  t.is(b.get(42424242424243), undefined)
  t.is(b.get(42), 42)
})

test('grow', function (t) {
  const b = new BigSparseArray()

  for (let i = 0; i < 10000; i++) {
    b.set(i, i)
  }

  let missing = 10000

  for (let i = 0; i < 10000; i++) {
    if (b.get(i) === i) missing--
  }

  t.is(missing, 0)
})

test('bounds', function (t) {
  const b = new BigSparseArray()

  b.set(0, true)

  t.is(b.get(4096), undefined)
})
