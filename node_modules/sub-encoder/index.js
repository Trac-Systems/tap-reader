const codecs = require('codecs')
const b = require('b4a')

const SEP = b.alloc(1)
const SEP_BUMPED = b.from([0x1])
const EMPTY = b.alloc(0)

module.exports = class SubEncoder {
  constructor (prefix, encoding, parent = null) {
    this.userEncoding = codecs(encoding)
    this.prefix = prefix != null ? createPrefix(prefix, parent) : null
    this.lt = this.prefix && b.concat([this.prefix.subarray(0, this.prefix.byteLength - 1), SEP_BUMPED])
  }

  _encodeRangeUser (r) {
    if (this.userEncoding.encodeRange) return this.userEncoding.encodeRange(r)

    return {
      gt: r.gt && this.userEncoding.encode(r.gt),
      gte: r.gte && this.userEncoding.encode(r.gte),
      lte: r.lte && this.userEncoding.encode(r.lte),
      lt: r.lt && this.userEncoding.encode(r.lt)
    }
  }

  _addPrefix (key) {
    return this.prefix ? b.concat([this.prefix, key]) : key
  }

  encode (key) {
    return this._addPrefix(this.userEncoding.encode(key))
  }

  encodeRange (range) {
    const r = this._encodeRangeUser(range)

    if (r.gt) r.gt = this._addPrefix(r.gt)
    else if (r.gte) r.gte = this._addPrefix(r.gte)
    else if (this.prefix) r.gte = this.prefix

    if (r.lt) r.lt = this._addPrefix(r.lt)
    else if (r.lte) r.lte = this._addPrefix(r.lte)
    else if (this.prefix) r.lt = this.lt

    return r
  }

  decode (key) {
    return this.userEncoding.decode(this.prefix ? key.subarray(this.prefix.byteLength) : key)
  }

  sub (prefix, encoding) {
    return new SubEncoder(prefix || EMPTY, compat(encoding), this.prefix)
  }
}

function createPrefix (prefix, parent) {
  prefix = typeof prefix === 'string' ? b.from(prefix) : prefix

  if (prefix && parent) return b.concat([parent, prefix, SEP])
  if (prefix) return b.concat([prefix, SEP])
  if (parent) return b.concat([parent, SEP])
  return SEP
}

function compat (enc) {
  if (enc && enc.keyEncoding) return enc.keyEncoding
  return enc
}
