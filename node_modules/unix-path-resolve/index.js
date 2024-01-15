module.exports = resolve

function parse (addr) {
  const names = addr.split(/[/\\]/)

  const r = {
    isAbsolute: false,
    names
  }

  // don't think this ever happens, but whatevs
  if (names.length === 0) return r

  if (names.length > 1 && names[0].endsWith(':')) {
    r.isAbsolute = true

    if (names[0].length === 2) { // windows
      r.names = names.slice(1)
      return r
    }

    if (names[0] === 'file:') {
      r.names = names.slice(1)
      return r
    }

    r.names = names.slice(3)
    return r
  }

  r.isAbsolute = addr.startsWith('/') || addr.startsWith('\\')

  return r
}

function resolve (a, b = '') {
  const ap = parse(a)
  const bp = parse(b)

  if (bp.isAbsolute) {
    return resolveNames([], bp.names)
  }

  if (!ap.isAbsolute) {
    throw new Error('One of the two paths must be absolute')
  }

  return resolveNames(ap.names, bp.names)
}

function toString (p, names) {
  for (let i = 0; i < names.length; i++) {
    if (names[i] === '') continue
    if (names[i] === '.') continue
    if (names[i] === '..') {
      if (p.length === 1) throw new Error('Path cannot be resolved, too many \'..\'')
      p = p.slice(0, p.lastIndexOf('/')) || '/'
      continue
    }
    p += (p.length === 1 ? names[i] : '/' + names[i])
  }

  return p
}

function resolveNames (a, b) {
  return toString(toString('/', a), b)
}
