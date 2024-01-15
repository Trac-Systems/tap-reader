const fallback = require('./fallback')

try {
  const native = require('quickbit-native')

  // These functions are faster in JavaScript
  exports.get = fallback.get
  exports.set = fallback.set
  exports.fill = fallback.fill

  // These functions are faster in C
  exports.clear = native.clear
  exports.findFirst = native.findFirst
  exports.findLast = native.findLast
  exports.Index = native.Index
} catch {
  module.exports = fallback
}
