module.exports = sameData

function type (o) {
  const t = typeof o

  return t === 'object'
    ? Array.isArray(o)
      ? 'array'
      : isTypedArray(o)
        ? (typeof o.equals === 'function') ? 'buffer' : 'array'
        : (o === null ? 'null' : 'object')
    : t
}

function isTypedArray (a) {
  return !!a && typeof a.length === 'number' && ArrayBuffer.isView(a.array)
}

function sameData (a, b) {
  if (a === b) return true

  const ta = type(a)
  const tb = type(b)

  if (ta !== tb) return false

  if (ta === 'buffer') return a.equals(b)

  if (ta === 'array') {
    if (a.length !== b.length) return false

    for (let i = 0; i < a.length; i++) {
      if (!sameData(a[i], b[i])) return false
    }

    return true
  }

  if (ta !== 'object') return false

  const ea = Object.entries(a)
  const eb = Object.entries(b)

  if (ea.length !== eb.length) return false

  ea.sort(cmp)
  eb.sort(cmp)

  for (let i = 0; i < ea.length; i++) {
    if (ea[i][0] !== eb[i][0] || !sameData(ea[i][1], eb[i][1])) return false
  }

  return true
}

function cmp (a, b) {
  return a[0] === b[0] ? 0 : a[0] < b[0] ? -1 : 1
}
