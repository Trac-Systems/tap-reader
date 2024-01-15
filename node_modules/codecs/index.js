const b4a = require('b4a')

module.exports = codecs

codecs.ascii = createString('ascii')
codecs.utf8 = createString('utf-8')
codecs.hex = createString('hex')
codecs.base64 = createString('base64')
codecs.ucs2 = createString('ucs2')
codecs.utf16le = createString('utf16le')
codecs.ndjson = createJSON(true)
codecs.json = createJSON(false)
codecs.binary = {
  name: 'binary',
  encode: function encodeBinary (obj) {
    return typeof obj === 'string'
      ? b4a.from(obj, 'utf-8')
      : b4a.toBuffer(obj)
  },
  decode: function decodeBinary (buf) {
    return b4a.toBuffer(buf)
  }
}

function isCompactEncoding (c) {
  return !!(c.encode && c.decode && c.preencode)
}

function fromCompactEncoding (c) {
  return {
    name: 'compact-encoding',
    encode: function encodeWithCompact (value) {
      const state = { start: 0, end: 0, buffer: null, cache: null }
      c.preencode(state, value)
      state.buffer = b4a.allocUnsafe(state.end)
      c.encode(state, value)
      return state.buffer
    },
    decode: function decodeWithCompact (buffer) {
      return c.decode({ start: 0, end: buffer.byteLength, buffer, cache: null })
    }
  }
}

function codecs (fmt, fallback) {
  if (typeof fmt === 'object' && fmt) {
    return isCompactEncoding(fmt) ? fromCompactEncoding(fmt) : fmt
  }

  switch (fmt) {
    case 'ndjson': return codecs.ndjson
    case 'json': return codecs.json
    case 'ascii': return codecs.ascii
    case 'utf-8':
    case 'utf8': return codecs.utf8
    case 'hex': return codecs.hex
    case 'base64': return codecs.base64
    case 'ucs-2':
    case 'ucs2': return codecs.ucs2
    case 'utf16-le':
    case 'utf16le': return codecs.utf16le
  }

  return fallback !== undefined ? fallback : codecs.binary
}

function createJSON (newline) {
  return {
    name: newline ? 'ndjson' : 'json',
    encode: newline ? encodeNDJSON : encodeJSON,
    decode: function decodeJSON (buf) {
      return JSON.parse(b4a.toString(buf))
    }
  }

  function encodeJSON (val) {
    return b4a.from(JSON.stringify(val))
  }

  function encodeNDJSON (val) {
    return b4a.from(JSON.stringify(val) + '\n')
  }
}

function createString (type) {
  return {
    name: type,
    encode: function encodeString (val) {
      if (typeof val !== 'string') val = val.toString()
      return b4a.from(val, type)
    },
    decode: function decodeString (buf) {
      return b4a.toString(buf, type)
    }
  }
}
