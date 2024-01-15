const b4a = require('b4a')

module.exports = function isOptions (opts) {
  return typeof opts === 'object' && opts && !b4a.isBuffer(opts)
}
