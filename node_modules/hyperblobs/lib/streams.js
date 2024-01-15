const { Readable, Writable } = require('streamx')
const { BLOCK_NOT_AVAILABLE } = require('hypercore-errors')

class SparsePrefetcher {
  constructor (opts = {}) {
    this._linear = opts.linear !== false
    this._length = opts.length || 10
  }

  prefetch (bounds, index) {
    const startBlock = bounds.blockOffset
    const endBlock = startBlock + bounds.blockLength
    return {
      start: Math.max(index, startBlock),
      end: Math.min(index + this._length, endBlock),
      linear: this._linear
    }
  }
}

/* eslint-disable no-unused-vars */
class EagerPrefetcher {
  constructor (opts = {}) {
    this._linear = opts.linear !== false
    this._done = false
  }

  prefetch (bounds) {
    if (this._done) return null
    this._done = true
    const startBlock = bounds.blockOffset
    const endBlock = startBlock + bounds.blockLength
    return { start: startBlock, end: endBlock, linear: this._linear }
  }
}

class BlobWriteStream extends Writable {
  constructor (core, lock, opts) {
    super(opts)
    this.id = {}
    this.core = core
    this._lock = lock
    this._release = null
    this._batch = []
  }

  _open (cb) {
    this.core.ready().then(() => {
      this._lock(release => {
        this._release = release
        this.id.byteOffset = this.core.byteLength
        this.id.blockOffset = this.core.length
        return cb(null)
      })
    }, err => cb(err))
  }

  _final (cb) {
    this._append(err => {
      if (err) return cb(err)
      this.id.blockLength = this.core.length - this.id.blockOffset
      this.id.byteLength = this.core.byteLength - this.id.byteOffset
      return cb(null)
    })
  }

  _destroy (cb) {
    if (this._release) this._release()
    cb(null)
  }

  _append (cb) {
    if (!this._batch.length) return cb(null)
    return this.core.append(this._batch).then(() => {
      this._batch = []
      return cb(null)
    }, err => {
      this._batch = []
      return cb(err)
    })
  }

  _write (data, cb) {
    this._batch.push(data)
    if (this._batch.length >= 16) return this._append(cb)
    return cb(null)
  }
}

class BlobReadStream extends Readable {
  constructor (core, id, opts = {}) {
    super(opts)
    this.id = id
    this.core = core.session({ wait: opts.wait, timeout: opts.timeout })

    this._prefetch = opts.wait === false ? noPrefetch : opts.prefetch
    this._lastPrefetch = null
    if (!this._prefetch) {
      const prefetcher = new SparsePrefetcher(opts)
      this._prefetch = prefetcher.prefetch.bind(prefetcher)
    }

    this._pos = opts.start !== undefined ? id.byteOffset + opts.start : id.byteOffset

    if (opts.length !== undefined) this._end = this._pos + opts.length
    else if (opts.end !== undefined) this._end = id.byteOffset + opts.end + 1
    else this._end = id.byteOffset + id.byteLength

    this._index = 0
    this._relativeOffset = 0
    this._bytesRead = 0
  }

  _open (cb) {
    if (this._pos === this.id.byteOffset) {
      this._index = this.id.blockOffset
      this._relativeOffset = 0
      return cb(null)
    }

    this.core.seek(this._pos, {
      start: this.id.blockOffset,
      end: this.id.blockOffset + this.id.blockLength
    }).then(result => {
      if (!result) return cb(BLOCK_NOT_AVAILABLE())

      this._index = result[0]
      this._relativeOffset = result[1]
      return cb(null)
    }, err => cb(err))
  }

  _predestroy () {
    this.core.close().then(noop, noop)
  }

  _destroy (cb) {
    this.core.close().then(cb, cb)
  }

  _read (cb) {
    if (this._pos >= this._end) {
      this.push(null)
      return cb(null)
    }

    const prefetch = this._prefetch(this.id, this._index)
    if (prefetch) {
      if (this._lastPrefetch) this.core.undownload(this._lastPrefetch)
      this._lastPrefetch = this.core.download(prefetch)
    }

    this.core.get(this._index).then(block => {
      if (!block) return cb(BLOCK_NOT_AVAILABLE())

      const remainder = this._end - this._pos
      if (this._relativeOffset || (remainder < block.length)) {
        block = block.subarray(this._relativeOffset, this._relativeOffset + remainder)
      }

      this._index++
      this._relativeOffset = 0
      this._pos += block.length
      this._bytesRead += block.length

      this.push(block)
      return cb(null)
    }, err => cb(err))
  }
}

module.exports = {
  BlobReadStream,
  BlobWriteStream
}

function noop () {}

function noPrefetch () {
  return null
}
