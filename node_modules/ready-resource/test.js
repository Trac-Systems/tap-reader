const test = require('brittle')
const Resource = require('./')

test('basic', async function (t) {
  const r = new Resource()

  let opened = false
  let closed = false

  r._open = async function () {
    opened = true
  }

  r._close = async function () {
    closed = true
  }

  await r.ready()

  t.is(opened, true)
  t.is(closed, false)

  await r.close()

  t.is(opened, true)
  t.is(closed, true)
})
