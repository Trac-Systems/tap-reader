const test = require('brittle')
const RW = require('./')

test('as many reads as you want', async function (t) {
  const rw = new RW()

  await rw.read.lock()
  await rw.read.lock()

  t.pass('didnt dead lock')

  rw.read.unlock()
  rw.read.unlock()
})

test('only one read at the time', async function (t) {
  t.plan(1)

  const rw = new RW()

  let released = false
  await rw.write.lock()

  rw.write.lock().then(() => {
    t.ok(released, 'only one writer active')
  })

  await new Promise(resolve => setImmediate(resolve))

  rw.write.unlock()
  released = true
})

test('reads waits for writer', async function (t) {
  t.plan(1)

  const rw = new RW()

  let released = false
  await rw.write.lock()

  rw.read.lock().then(() => {
    t.ok(released, 'read waited for writer')
  })

  await new Promise(resolve => setImmediate(resolve))

  rw.write.unlock()
  released = true
})

test('writer waits for all reads', async function (t) {
  t.plan(1)

  const rw = new RW()

  let released = false
  await rw.read.lock()
  await rw.read.lock()

  rw.write.lock().then(() => {
    t.ok(released, 'write waited for all readers')
  })

  await new Promise(resolve => setImmediate(resolve))

  rw.read.unlock()

  await new Promise(resolve => setImmediate(resolve))

  rw.read.unlock()
  released = true
})
