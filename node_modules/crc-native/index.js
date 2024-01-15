const binding = require('node-gyp-build')(__dirname)

exports.crc32 = function crc32 (buffer) {
  return binding.crc_u32_napi(buffer)
}
