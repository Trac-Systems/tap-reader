#include <napi-macros.h>
#include <node_api.h>
#include <quickbit.h>
#include <stdlib.h>

static inline void
quickbit_napi_argv_chunks (napi_env env, napi_value napi_chunks, quickbit_chunk_t **chunks, uint32_t *len) {
  napi_get_array_length(env, napi_chunks, len);

  *chunks = calloc(*len, sizeof(quickbit_chunk_t));

  for (uint32_t i = 0; i < *len; i++) {
    napi_value napi_chunk;
    napi_get_element(env, napi_chunks, i, &napi_chunk);

    napi_value napi_field;
    napi_get_named_property(env, napi_chunk, "field", &napi_field);

    napi_value napi_offset;
    napi_get_named_property(env, napi_chunk, "offset", &napi_offset);

    uint8_t *field;
    size_t len;
    napi_get_buffer_info(env, napi_field, (void **) &field, &len);

    uint32_t offset;
    napi_get_value_uint32(env, napi_offset, &offset);

    (*chunks)[i] = (quickbit_chunk_t){
      .field = field,
      .len = len,
      .offset = offset,
    };
  }
}

NAPI_METHOD(quickbit_napi_get) {
  NAPI_ARGV(2);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, field, 0);
  NAPI_ARGV_INT32(bit, 1);

  NAPI_RETURN_UINT32(quickbit_get(field, field_len, bit))
}

NAPI_METHOD(quickbit_napi_set) {
  NAPI_ARGV(3);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, field, 0);
  NAPI_ARGV_INT32(bit, 1);
  NAPI_ARGV_UINT32(value, 2);

  NAPI_RETURN_UINT32(quickbit_set(field, field_len, bit, value))
}

NAPI_METHOD(quickbit_napi_fill) {
  NAPI_ARGV(4);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, field, 0);
  NAPI_ARGV_UINT32(value, 1);
  NAPI_ARGV_INT32(start, 2);
  NAPI_ARGV_INT32(end, 3);

  quickbit_fill(field, field_len, value, start, end);

  return NULL;
}

NAPI_METHOD(quickbit_napi_clear) {
  NAPI_ARGV(2);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, field, 0);

  quickbit_chunk_t *chunks;
  uint32_t len;
  quickbit_napi_argv_chunks(env, argv[1], &chunks, &len);

  for (size_t i = 0; i < len; i++) {
    quickbit_clear(field, field_len, &chunks[i]);
  }

  free(chunks);

  return NULL;
}

NAPI_METHOD(quickbit_napi_find_first) {
  NAPI_ARGV(3);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, field, 0);
  NAPI_ARGV_UINT32(value, 1);
  NAPI_ARGV_INT32(position, 2);

  NAPI_RETURN_INT32(quickbit_find_first(field, field_len, value, position))
}

NAPI_METHOD(quickbit_napi_find_last) {
  NAPI_ARGV(3);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, field, 0);
  NAPI_ARGV_UINT32(value, 1);
  NAPI_ARGV_INT32(position, 2);

  NAPI_RETURN_INT32(quickbit_find_last(field, field_len, value, position))
}

NAPI_METHOD(quickbit_napi_index_init) {
  NAPI_ARGV(2);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, index, 0);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, field, 1);

  quickbit_index_init(index, field, field_len);

  return NULL;
}

NAPI_METHOD(quickbit_napi_index_init_sparse) {
  NAPI_ARGV(2);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, index, 0);

  quickbit_chunk_t *chunks;
  uint32_t len;
  quickbit_napi_argv_chunks(env, argv[1], &chunks, &len);

  quickbit_index_init_sparse(index, chunks, len);

  free(chunks);

  return NULL;
}

NAPI_METHOD(quickbit_napi_index_update) {
  NAPI_ARGV(3);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, index, 0);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, field, 1);
  NAPI_ARGV_INT32(bit, 2);

  NAPI_RETURN_UINT32(quickbit_index_update(index, field, field_len, bit))
}

NAPI_METHOD(quickbit_napi_index_update_sparse) {
  NAPI_ARGV(3);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, index, 0);
  NAPI_ARGV_INT32(bit, 2);

  quickbit_chunk_t *chunks;
  uint32_t len;
  quickbit_napi_argv_chunks(env, argv[1], &chunks, &len);

  bool changed = quickbit_index_update_sparse(index, chunks, len, bit);

  free(chunks);

  NAPI_RETURN_UINT32(changed)
}

NAPI_METHOD(quickbit_napi_skip_first) {
  NAPI_ARGV(4);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, index, 0);
  NAPI_ARGV_UINT32(len, 1);
  NAPI_ARGV_UINT32(value, 2);
  NAPI_ARGV_INT32(position, 3);

  NAPI_RETURN_UINT32(quickbit_skip_first(index, len, value, position))
}

NAPI_METHOD(quickbit_napi_skip_last) {
  NAPI_ARGV(4);
  NAPI_ARGV_BUFFER_CAST(uint8_t *, index, 0);
  NAPI_ARGV_UINT32(len, 1);
  NAPI_ARGV_UINT32(value, 2);
  NAPI_ARGV_INT32(position, 3);

  NAPI_RETURN_UINT32(quickbit_skip_last(index, len, value, position))
}

NAPI_INIT() {
  NAPI_EXPORT_SIZEOF(quickbit_index_t)

  NAPI_EXPORT_FUNCTION(quickbit_napi_get)
  NAPI_EXPORT_FUNCTION(quickbit_napi_set)
  NAPI_EXPORT_FUNCTION(quickbit_napi_fill)
  NAPI_EXPORT_FUNCTION(quickbit_napi_clear)
  NAPI_EXPORT_FUNCTION(quickbit_napi_find_first)
  NAPI_EXPORT_FUNCTION(quickbit_napi_find_last)
  NAPI_EXPORT_FUNCTION(quickbit_napi_index_init)
  NAPI_EXPORT_FUNCTION(quickbit_napi_index_init_sparse)
  NAPI_EXPORT_FUNCTION(quickbit_napi_index_update)
  NAPI_EXPORT_FUNCTION(quickbit_napi_index_update_sparse)
  NAPI_EXPORT_FUNCTION(quickbit_napi_skip_first)
  NAPI_EXPORT_FUNCTION(quickbit_napi_skip_last)
}
