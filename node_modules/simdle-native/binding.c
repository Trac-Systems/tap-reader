#include <napi-macros.h>
#include <node_api.h>
#include <simdle.h>

#define SIMDLE_NAPI_UNARY(fn) \
  NAPI_ARGV(2); \
  NAPI_ARGV_BUFFER_CAST(simdle_v128_t *, buf, 0); \
  NAPI_ARGV_BUFFER_CAST(simdle_v128_t *, result, 1); \
\
  for (size_t i = 0, n = buf_len / 16; i < n; i++) { \
    result[i] = fn(buf[i]); \
  } \
\
  return NULL;

#define SIMDLE_NAPI_BINARY(fn) \
  NAPI_ARGV(3); \
  NAPI_ARGV_BUFFER_CAST(simdle_v128_t *, a, 0); \
  NAPI_ARGV_BUFFER_CAST(simdle_v128_t *, b, 1); \
  NAPI_ARGV_BUFFER_CAST(simdle_v128_t *, result, 2); \
\
  for (size_t i = 0, n = result_len / 16; i < n; i++) { \
    result[i] = fn(a[i], b[i]); \
  } \
\
  return NULL;

#define SIMDLE_NAPI_REDUCE(fn) \
  NAPI_ARGV(1); \
  NAPI_ARGV_BUFFER_CAST(simdle_v128_t *, buf, 0); \
\
  uint64_t result = 0; \
\
  for (size_t i = 0, n = buf_len / 16; i < n; i++) { \
    result += fn(buf[i]); \
  } \
\
  napi_value napi_result; \
  NAPI_STATUS_THROWS(napi_create_bigint_uint64(env, result, &napi_result)) \
  return napi_result;

NAPI_METHOD(simdle_napi_allo_v128) {
  NAPI_ARGV(1);
  NAPI_ARGV_BUFFER_CAST(simdle_v128_t *, buf, 0);

  for (size_t i = 0, n = buf_len / 16; i < n; i++) {
    if (!simdle_allo_v128(buf[i])) {
      NAPI_RETURN_UINT32(0)
    }
  }

  NAPI_RETURN_UINT32(1)
}

NAPI_METHOD(simdle_napi_allz_v128) {
  NAPI_ARGV(1);
  NAPI_ARGV_BUFFER_CAST(simdle_v128_t *, buf, 0);

  for (size_t i = 0, n = buf_len / 16; i < n; i++) {
    if (!simdle_allz_v128(buf[i])) {
      NAPI_RETURN_UINT32(0)
    }
  }

  NAPI_RETURN_UINT32(1)
}

NAPI_METHOD(simdle_napi_and_v128_u8) {
  SIMDLE_NAPI_BINARY(simdle_and_v128_u8);
}

NAPI_METHOD(simdle_napi_and_v128_u16) {
  SIMDLE_NAPI_BINARY(simdle_and_v128_u16);
}

NAPI_METHOD(simdle_napi_and_v128_u32) {
  SIMDLE_NAPI_BINARY(simdle_and_v128_u32);
}

NAPI_METHOD(simdle_napi_clear_v128_u8) {
  SIMDLE_NAPI_BINARY(simdle_clear_v128_u8);
}

NAPI_METHOD(simdle_napi_clear_v128_u16) {
  SIMDLE_NAPI_BINARY(simdle_clear_v128_u16);
}

NAPI_METHOD(simdle_napi_clear_v128_u32) {
  SIMDLE_NAPI_BINARY(simdle_clear_v128_u32);
}

NAPI_METHOD(simdle_napi_clo_v128_u8) {
  SIMDLE_NAPI_UNARY(simdle_clo_v128_u8);
}

NAPI_METHOD(simdle_napi_clo_v128_u16) {
  SIMDLE_NAPI_UNARY(simdle_clo_v128_u16);
}

NAPI_METHOD(simdle_napi_clo_v128_u32) {
  SIMDLE_NAPI_UNARY(simdle_clo_v128_u32);
}

NAPI_METHOD(simdle_napi_clz_v128_u8) {
  SIMDLE_NAPI_UNARY(simdle_clz_v128_u8);
}

NAPI_METHOD(simdle_napi_clz_v128_u16) {
  SIMDLE_NAPI_UNARY(simdle_clz_v128_u16);
}

NAPI_METHOD(simdle_napi_clz_v128_u32) {
  SIMDLE_NAPI_UNARY(simdle_clz_v128_u32);
}

NAPI_METHOD(simdle_napi_cnt_v128_u8) {
  SIMDLE_NAPI_UNARY(simdle_cnt_v128_u8);
}

NAPI_METHOD(simdle_napi_cnt_v128_u16) {
  SIMDLE_NAPI_UNARY(simdle_cnt_v128_u16);
}

NAPI_METHOD(simdle_napi_cnt_v128_u32) {
  SIMDLE_NAPI_UNARY(simdle_cnt_v128_u32);
}

NAPI_METHOD(simdle_napi_cto_v128_u8) {
  SIMDLE_NAPI_UNARY(simdle_cto_v128_u8);
}

NAPI_METHOD(simdle_napi_cto_v128_u16) {
  SIMDLE_NAPI_UNARY(simdle_cto_v128_u16);
}

NAPI_METHOD(simdle_napi_cto_v128_u32) {
  SIMDLE_NAPI_UNARY(simdle_cto_v128_u32);
}

NAPI_METHOD(simdle_napi_ctz_v128_u8) {
  SIMDLE_NAPI_UNARY(simdle_ctz_v128_u8);
}

NAPI_METHOD(simdle_napi_ctz_v128_u16) {
  SIMDLE_NAPI_UNARY(simdle_ctz_v128_u16);
}

NAPI_METHOD(simdle_napi_ctz_v128_u32) {
  SIMDLE_NAPI_UNARY(simdle_ctz_v128_u32);
}

NAPI_METHOD(simdle_napi_not_v128_u8) {
  SIMDLE_NAPI_UNARY(simdle_not_v128_u8);
}

NAPI_METHOD(simdle_napi_not_v128_u16) {
  SIMDLE_NAPI_UNARY(simdle_not_v128_u16);
}

NAPI_METHOD(simdle_napi_not_v128_u32) {
  SIMDLE_NAPI_UNARY(simdle_not_v128_u32);
}

NAPI_METHOD(simdle_napi_or_v128_u8) {
  SIMDLE_NAPI_BINARY(simdle_or_v128_u8);
}

NAPI_METHOD(simdle_napi_or_v128_u16) {
  SIMDLE_NAPI_BINARY(simdle_or_v128_u16);
}

NAPI_METHOD(simdle_napi_or_v128_u32) {
  SIMDLE_NAPI_BINARY(simdle_or_v128_u32);
}

NAPI_METHOD(simdle_napi_sum_v128_u8) {
  SIMDLE_NAPI_REDUCE(simdle_sum_v128_u8);
}

NAPI_METHOD(simdle_napi_sum_v128_u16) {
  SIMDLE_NAPI_REDUCE(simdle_sum_v128_u16);
}

NAPI_METHOD(simdle_napi_sum_v128_u32) {
  SIMDLE_NAPI_REDUCE(simdle_sum_v128_u32);
}

NAPI_METHOD(simdle_napi_xor_v128_u8) {
  SIMDLE_NAPI_BINARY(simdle_xor_v128_u8);
}

NAPI_METHOD(simdle_napi_xor_v128_u16) {
  SIMDLE_NAPI_BINARY(simdle_xor_v128_u16);
}

NAPI_METHOD(simdle_napi_xor_v128_u32) {
  SIMDLE_NAPI_BINARY(simdle_xor_v128_u32);
}

NAPI_INIT() {
  NAPI_EXPORT_FUNCTION(simdle_napi_allo_v128);
  NAPI_EXPORT_FUNCTION(simdle_napi_allz_v128);

  NAPI_EXPORT_FUNCTION(simdle_napi_and_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_and_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_and_v128_u32);

  NAPI_EXPORT_FUNCTION(simdle_napi_clear_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_clear_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_clear_v128_u32);

  NAPI_EXPORT_FUNCTION(simdle_napi_clo_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_clo_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_clo_v128_u32);

  NAPI_EXPORT_FUNCTION(simdle_napi_clz_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_clz_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_clz_v128_u32);

  NAPI_EXPORT_FUNCTION(simdle_napi_cnt_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_cnt_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_cnt_v128_u32);

  NAPI_EXPORT_FUNCTION(simdle_napi_cto_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_cto_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_cto_v128_u32);

  NAPI_EXPORT_FUNCTION(simdle_napi_ctz_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_ctz_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_ctz_v128_u32);

  NAPI_EXPORT_FUNCTION(simdle_napi_not_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_not_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_not_v128_u32);

  NAPI_EXPORT_FUNCTION(simdle_napi_or_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_or_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_or_v128_u32);

  NAPI_EXPORT_FUNCTION(simdle_napi_sum_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_sum_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_sum_v128_u32);

  NAPI_EXPORT_FUNCTION(simdle_napi_xor_v128_u8);
  NAPI_EXPORT_FUNCTION(simdle_napi_xor_v128_u16);
  NAPI_EXPORT_FUNCTION(simdle_napi_xor_v128_u32);
}
