#include <crc.h>
#include <napi-macros.h>
#include <node_api.h>

NAPI_METHOD(crc_u32_napi) {
  NAPI_ARGV(1);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, buf, 0);

  NAPI_RETURN_UINT32(crc_u32(buf, buf_len));
}

NAPI_INIT() {
  NAPI_EXPORT_FUNCTION(crc_u32_napi);
}
