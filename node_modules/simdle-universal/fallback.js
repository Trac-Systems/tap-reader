const b4a = require('b4a')
const scalar = require('./scalar')

function view (buf, n) {
  if (n === buf.BYTES_PER_ELEMENT) return buf

  let TypedArray

  if (n === 1) TypedArray = Uint8Array
  else if (n === 2) TypedArray = Uint16Array
  else TypedArray = Uint32Array

  return new TypedArray(buf.buffer, buf.byteOffset, buf.byteLength / n)
}

function unary (u8, u16 = u8, u32 = u16) {
  return function unary (buf, result = b4a.allocUnsafe(buf.byteLength)) {
    if (buf.byteLength % 16 !== 0) {
      throw new Error('Buffer length must be a multiple of 16')
    }

    if (buf.byteLength !== result.byteLength) {
      throw new Error('Length of result buffer is insufficient')
    }

    const n = buf.BYTES_PER_ELEMENT

    if (n === 1) u8(buf, view(result, n))
    else if (n === 2) u16(buf, view(result, n))
    else u32(buf, view(result, n))

    return result
  }
}

function binary (u8, u16 = u8, u32 = u16) {
  return function binary (a, b, result = b4a.allocUnsafe(a.byteLength)) {
    if (a.byteLength % 16 !== 0) {
      throw new Error('Buffer length must be a multiple of 16')
    }

    if (a.byteLength !== b.byteLength || a.byteLength !== result.byteLength) {
      throw new Error('Buffers must be the same length')
    }

    const n = a.BYTES_PER_ELEMENT

    if (n === 1) u8(a, b, view(result, n))
    else if (n === 2) u16(a, b, view(result, n))
    else u32(a, b, view(result, n))

    return result
  }
}

function reduce (u8, u16 = u8, u32 = u16) {
  return function reduce (buf) {
    if (buf.byteLength % 16 !== 0) {
      throw new Error('Buffer length must be a multiple of 16')
    }

    const n = buf.BYTES_PER_ELEMENT

    if (n === 1) return u8(buf)
    if (n === 2) return u16(buf)
    return u32(buf)
  }
}

exports.allo = function allo (buf) {
  if (buf.byteLength % 16 !== 0) {
    throw new Error('Buffer length must be a multiple of 16')
  }

  const m = 2 ** (buf.BYTES_PER_ELEMENT * 8) - 1

  for (let i = 0, n = buf.length; i < n; i++) {
    if (buf[i] !== m) return false
  }

  return true
}

exports.allz = function allz (buf) {
  if (buf.byteLength % 16 !== 0) {
    throw new Error('Buffer length must be a multiple of 16')
  }

  for (let i = 0, n = buf.length; i < n; i++) {
    if (buf[i] !== 0) return false
  }

  return true
}

exports.and = binary(
  (a, b, result) => {
    for (let i = 0, n = result.length; i < n; i++) {
      result[i] = a[i] & b[i]
    }
  }
)

exports.clear = binary(
  (a, b, result) => {
    for (let i = 0, n = result.length; i < n; i++) {
      result[i] = a[i] & ~b[i]
    }
  }
)

exports.clo = unary(
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = 24 - scalar.clo(buf[i])
    }
  },
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = 16 - scalar.clo(buf[i])
    }
  },
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = scalar.clo(buf[i])
    }
  }
)

exports.clz = unary(
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = 24 - scalar.clz(buf[i])
    }
  },
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = 16 - scalar.clz(buf[i])
    }
  },
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = scalar.clz(buf[i])
    }
  }
)

exports.cnt = unary(
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = scalar.cnt(buf[i]) & 0xff
    }
  },
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = scalar.cnt(buf[i]) & 0xffff
    }
  },
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = scalar.cnt(buf[i])
    }
  }
)

exports.cto = unary(
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = Math.min(scalar.cto(buf[i]), 8)
    }
  },
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = Math.min(scalar.cto(buf[i]), 16)
    }
  },
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = scalar.cto(buf[i])
    }
  }
)

exports.ctz = unary(
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = Math.min(scalar.ctz(buf[i]), 8)
    }
  },
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = Math.min(scalar.ctz(buf[i]), 16)
    }
  },
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = scalar.ctz(buf[i])
    }
  }
)

exports.not = unary(
  (buf, result) => {
    for (let i = 0, n = buf.length; i < n; i++) {
      result[i] = ~buf[i]
    }
  }
)

exports.or = binary(
  (a, b, result) => {
    for (let i = 0, n = result.length; i < n; i++) {
      result[i] = a[i] | b[i]
    }
  }
)

exports.sum = reduce(
  (buf) => {
    let result = 0n

    for (let i = 0, n = buf.length; i < n; i++) {
      result += BigInt(buf[i])
    }

    return result
  }
)

exports.xor = binary(
  (a, b, result) => {
    for (let i = 0, n = result.length; i < n; i++) {
      result[i] = a[i] ^ b[i]
    }
  }
)
