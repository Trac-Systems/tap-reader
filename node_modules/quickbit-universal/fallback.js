const simdle = require('simdle-universal')

const INDEX_LEN = (16 /* root */ + 128 * 16 /* children */) * 2

const get = exports.get = function get (field, bit) {
  const n = field.byteLength * 8

  if (bit < 0) bit += n
  if (bit < 0 || bit >= n) return false

  const m = field.BYTES_PER_ELEMENT * 8

  const offset = bit & (m - 1)
  const i = (bit - offset) / m

  return (field[i] & (1 << offset)) !== 0
}

const set = exports.set = function set (field, bit, value = true) {
  const n = field.byteLength * 8

  if (bit < 0) bit += n
  if (bit < 0 || bit >= n) return false

  const m = field.BYTES_PER_ELEMENT * 8

  const offset = bit & (m - 1)
  const i = (bit - offset) / m
  const mask = 1 << offset

  if (value) {
    if ((field[i] & mask) !== 0) return false
  } else {
    if ((field[i] & mask) === 0) return false
  }

  field[i] ^= mask

  return true
}

exports.fill = function fill (field, value, start = 0, end = field.byteLength * 8) {
  const n = field.byteLength * 8

  if (start < 0) start += n
  if (end < 0) end += n
  if (start < 0 || start >= field.byteLength * 8 || start >= end) return field

  const m = field.BYTES_PER_ELEMENT * 8

  let i, j

  {
    const offset = start & (m - 1)
    i = (start - offset) / m

    if (offset !== 0) {
      let shift = m - offset
      if (end - start < shift) shift = end - start

      const mask = ((1 << shift) - 1) << offset

      if (value) field[i] |= mask
      else field[i] &= ~mask

      i++
    }
  }

  {
    const offset = end & (m - 1)
    j = (end - offset) / m

    if (offset !== 0 && j >= i) {
      const mask = (1 << offset) - 1

      if (value) field[j] |= mask
      else field[j] &= ~mask
    }
  }

  if (i < j) field.fill(value ? (2 ** m) - 1 : 0, i, j)

  return field
}

exports.clear = function clear (field, ...chunks) {
  const n = field.byteLength

  for (const chunk of chunks) {
    if (chunk.offset >= n) continue

    const m = chunk.field.byteLength

    let i = chunk.offset
    let j = 0

    while (((i & 15) !== 0 || (j & 15) !== 0) && i < n && j < m) {
      field[i] = field[i] & ~chunk.field[j]
      i++
      j++
    }

    if (i + 15 < n && j + 15 < m) {
      const len = Math.min(n - (n & 15) - i, m - (m & 15) - j)

      simdle.clear(field.subarray(i, i + len), chunk.field.subarray(j, j + len), field.subarray(i, i + len))
    }

    while (i < n && j < m) {
      field[i] = field[i] & ~chunk.field[j]
      i++
      j++
    }
  }
}

function bitOffset (bit, offset) {
  return !bit ? offset : (INDEX_LEN * 8 / 2) + offset
}

function byteOffset (bit, offset) {
  return !bit ? offset : (INDEX_LEN / 2) + offset
}

exports.findFirst = function findFirst (field, value, position = 0) {
  const n = field.byteLength * 8

  if (position < 0) position += n
  if (position < 0) position = 0
  if (position >= n) return -1

  value = !!value

  for (let i = position; i < n; i++) {
    if (get(field, i) === value) return i
  }

  return -1
}

exports.findLast = function findLast (field, value, position = field.byteLength * 8 - 1) {
  const n = field.byteLength * 8

  if (position < 0) position += n
  if (position < 0) return -1
  if (position >= n) position = n - 1

  value = !!value

  for (let i = position; i >= 0; i--) {
    if (get(field, i) === value) return i
  }

  return -1
}

const Index = exports.Index = class Index {
  static from (fieldOrChunks, byteLength = -1) {
    if (Array.isArray(fieldOrChunks)) {
      return new SparseIndex(fieldOrChunks, byteLength)
    } else {
      return new DenseIndex(fieldOrChunks, byteLength)
    }
  }

  constructor (byteLength) {
    this._byteLength = byteLength
    this.handle = new Uint32Array(INDEX_LEN / 4)
  }

  get byteLength () {
    return this._byteLength
  }

  skipFirst (value, position = 0) {
    const n = this.byteLength * 8

    if (position < 0) position += n
    if (position < 0) position = 0
    if (position >= n) return n - 1

    let i = Math.floor(position / 16384)

    if (i > 127) return position

    while (i <= 127 && get(this.handle, bitOffset(value, i))) {
      i++
    }

    if (i === 128) return n - 1

    let k = i * 16384
    let j = 0

    if (position > k) j = Math.floor((position - k) / 128)

    while (j <= 127 && get(this.handle, bitOffset(value, i * 128 + j + 128))) {
      j++
      k += 128
    }

    if (j === 128 && i !== 127) return this.skipFirst(value, (i + 1) * 16384)

    if (k > position) position = k

    return position < n ? position : n - 1
  }

  skipLast (value, position = this.byteLength * 8 - 1) {
    const n = this.byteLength * 8

    if (position < 0) position += n
    if (position < 0) return 0
    if (position >= n) position = n - 1

    let i = Math.floor(position / 16384)

    if (i > 127) return position

    while (i >= 0 && get(this.handle, bitOffset(value, i))) {
      i--
    }

    if (i === -1) return 0

    let k = ((i + 1) * 16384) - 1
    let j = 127

    if (position < k) j = 128 - Math.ceil((k - position) / 128)

    while (j >= 0 && get(this.handle, bitOffset(value, i * 128 + j + 128))) {
      j--
      k -= 128
    }

    if (j === -1 && i !== 0) return this.skipLast(value, i * 16384 - 1)

    if (k < position) position = k

    return position
  }
}

class DenseIndex extends Index {
  constructor (field, byteLength) {
    super(byteLength)
    this.field = field

    const m = field.BYTES_PER_ELEMENT

    for (let i = 0; i < 128; i++) {
      for (let j = 0; j < 128; j++) {
        const offset = (i * 128 + j) * 16
        let allz = true
        let allo = false

        if (offset + 16 <= this.field.byteLength) {
          const vec = this.field.subarray(offset / m, (offset + 16) / m)

          allz = simdle.allz(vec)
          allo = simdle.allo(vec)
        }

        const k = i * 128 + 128 + j

        set(this.handle, bitOffset(false, k), allz)
        set(this.handle, bitOffset(true, k), allo)
      }

      {
        const offset = byteOffset(false, i * 16 + 16) / 4
        const allo = simdle.allo(this.handle.subarray(offset, offset + 4))

        set(this.handle, bitOffset(false, i), allo)
      }

      {
        const offset = byteOffset(true, i * 16 + 16) / 4
        const allo = simdle.allo(this.handle.subarray(offset, offset + 4))

        set(this.handle, bitOffset(true, i), allo)
      }
    }
  }

  get byteLength () {
    if (this._byteLength !== -1) return this._byteLength
    return this.field.byteLength
  }

  update (bit) {
    const n = this.byteLength * 8

    if (bit < 0) bit += n
    if (bit < 0 || bit >= n) return false

    const m = this.field.BYTES_PER_ELEMENT

    const i = Math.floor(bit / 16384)
    const j = Math.floor(bit / 128)

    const offset = (j * 16) / m
    const vec = this.field.subarray(offset, offset + (16 / m))

    const allz = simdle.allz(vec)
    const allo = simdle.allo(vec)

    let changed = false

    if (set(this.handle, bitOffset(false, 128 + j), allz)) {
      changed = true

      const offset = byteOffset(false, i * 16 + 16) / 4
      const allo = simdle.allo(this.handle.subarray(offset, offset + 4))

      set(this.handle, bitOffset(false, i), allo)
    }

    if (set(this.handle, bitOffset(true, 128 + j), allo)) {
      changed = true

      const offset = byteOffset(true, i * 16 + 16) / 4
      const allo = simdle.allo(this.handle.subarray(offset, offset + 4))

      set(this.handle, bitOffset(true, i), allo)
    }

    return changed
  }
}

function selectChunk (chunks, offset) {
  for (let i = 0; i < chunks.length; i++) {
    const next = chunks[i]

    const start = next.offset
    const end = next.offset + next.field.byteLength

    if (offset >= start && offset + 16 <= end) {
      return next
    }
  }

  return null
}

class SparseIndex extends Index {
  constructor (chunks, byteLength) {
    super(byteLength)
    this.chunks = chunks

    for (let i = 0; i < 128; i++) {
      for (let j = 0; j < 128; j++) {
        const offset = (i * 128 + j) * 16
        let allz = true
        let allo = false

        const chunk = selectChunk(this.chunks, offset)

        if (chunk !== null) {
          const m = chunk.field.BYTES_PER_ELEMENT

          const vec = chunk.field.subarray((offset - chunk.offset) / m, (offset - chunk.offset + 16) / m)

          allz = simdle.allz(vec)
          allo = simdle.allo(vec)
        }

        const k = i * 128 + 128 + j

        set(this.handle, bitOffset(false, k), allz)
        set(this.handle, bitOffset(true, k), allo)
      }

      {
        const offset = byteOffset(false, i * 16 + 16) / 4
        const allo = simdle.allo(this.handle.subarray(offset, offset + 4))

        set(this.handle, bitOffset(false, i), allo)
      }

      {
        const offset = byteOffset(true, i * 16 + 16) / 4
        const allo = simdle.allo(this.handle.subarray(offset, offset + 4))

        set(this.handle, bitOffset(true, i), allo)
      }
    }
  }

  get byteLength () {
    if (this._byteLength !== -1) return this._byteLength
    const last = this.chunks[this.chunks.length - 1]
    return last ? last.offset + last.field.byteLength : 0
  }

  update (bit) {
    const n = this.byteLength * 8

    if (bit < 0) bit += n
    if (bit < 0 || bit >= n) return false

    const i = Math.floor(bit / 16384)
    const j = Math.floor(bit / 128)

    const offset = j * 16

    const chunk = selectChunk(this.chunks, offset)

    if (chunk === null) return false

    const m = chunk.field.BYTES_PER_ELEMENT

    const vec = chunk.field.subarray((offset - chunk.offset) / m, (offset - chunk.offset + 16) / m)

    const allz = simdle.allz(vec)
    const allo = simdle.allo(vec)

    let changed = false

    if (set(this.handle, bitOffset(false, 128 + j), allz)) {
      changed = true

      const offset = byteOffset(false, i * 16 + 16) / 4
      const allo = simdle.allo(this.handle.subarray(offset, offset + 4))

      set(this.handle, bitOffset(false, i), allo)
    }

    if (set(this.handle, bitOffset(true, 128 + j), allo)) {
      changed = true

      const offset = byteOffset(true, i * 16 + 16) / 4
      const allo = simdle.allo(this.handle.subarray(offset, offset + 4))

      set(this.handle, bitOffset(true, i), allo)
    }

    return changed
  }
}
