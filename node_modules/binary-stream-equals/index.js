const b4a = require('b4a')

module.exports = function (a, b) {
  return new Promise((resolve, reject) => binaryEquals(a, b, resolve, reject))
}

function binaryEquals (a, b, resolve, reject) {
  let aBuf = null
  let aEnded = false

  let bBuf = null
  let bEnded = false

  let closed = 0
  let done = false
  let error = null
  let equals = false

  a.on('readable', tick)
  a.on('end', onend)
  a.on('error', onerror)
  a.on('close', onclose)

  b.on('readable', tick)
  b.on('end', onend)
  b.on('error', onerror)
  b.on('close', onclose)

  function onerror (err) {
    error = err
    a.destroy()
    b.destroy()
  }

  function onclose () {
    if (++closed !== 2) return
    if (error !== null && done === false) reject(error)
    else resolve(equals)
  }

  function ondone (eq) {
    if (done) return
    done = true

    equals = eq

    a.destroy()
    b.destroy()
  }

  function onend () {
    if (this === a) aEnded = true
    else bEnded = true
    tick()
  }

  function tick () {
    while (done === false) {
      if (aBuf === null) aBuf = a.read()
      if (bBuf === null) bBuf = b.read()

      if (aBuf === null && bBuf === null && aEnded && bEnded) {
        ondone(true)
        return
      }

      if (aBuf !== null && (bBuf === null && bEnded)) {
        ondone(false)
        return
      }

      if (bBuf !== null && (aBuf === null && aEnded)) {
        ondone(false)
        return
      }

      if (aBuf === null || bBuf === null) return // read pending

      if (aBuf.byteLength === bBuf.byteLength) {
        if (b4a.equals(aBuf, bBuf)) {
          aBuf = bBuf = null
          continue
        }

        ondone(false)
        return
      }

      const min = Math.min(aBuf.byteLength, bBuf.byteLength)

      if (b4a.equals(aBuf.subarray(0, min), bBuf.subarray(0, min))) {
        aBuf = aBuf.byteLength === min ? null : aBuf.subarray(min)
        bBuf = bBuf.byteLength === min ? null : bBuf.subarray(min)
        continue
      }

      ondone(false)
      return
    }
  }
}
