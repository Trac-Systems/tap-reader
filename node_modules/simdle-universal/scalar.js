const clz = exports.clz = function clz (n) {
  return Math.clz32(n)
}

exports.clo = function clo (n) {
  return clz(~n)
}

const ctz = exports.ctz = function ctz (n) {
  return 32 - (n === 0 ? 0 : (clz(n & -n) + 1))
}

exports.cto = function cto (n) {
  return ctz(~n)
}

exports.cnt = function cnt (n) {
  n = n - ((n >>> 1) & 0x55555555)
  n = (n & 0x33333333) + ((n >>> 2) & 0x33333333)
  n = (n + (n >>> 4)) & 0x0f0f0f0f
  n = (n * 0x01010101) >>> 24
  return n
}
