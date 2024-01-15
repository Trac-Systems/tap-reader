try {
  module.exports = require('simdle-native')
} catch {
  module.exports = require('./fallback')
}
