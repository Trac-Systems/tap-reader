#ifndef QUICKBIT_H
#define QUICKBIT_H

#ifdef __cplusplus
extern "C" {
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#define QUICKBIT_INDEX_LEN ((16 /* root */ + 128 * 16 /* children */) * 2)

typedef uint8_t *quickbit_t;
typedef uint8_t quickbit_index_t[QUICKBIT_INDEX_LEN];

typedef struct quickbit_chunk_s quickbit_chunk_t;

struct quickbit_chunk_s {
  quickbit_t field;
  size_t len;
  size_t offset;
};

bool
quickbit_get (const quickbit_t field, size_t len, int64_t bit);

bool
quickbit_set (quickbit_t field, size_t len, int64_t bit, bool value);

void
quickbit_fill (const quickbit_t field, size_t len, bool value, int64_t start, int64_t end);

void
quickbit_clear (const quickbit_t field, size_t len, const quickbit_chunk_t *chunk);

int64_t
quickbit_find_first (const quickbit_t field, size_t len, bool value, int64_t position);

int64_t
quickbit_find_last (const quickbit_t field, size_t len, bool value, int64_t position);

void
quickbit_index_init (quickbit_index_t index, const quickbit_t field, size_t len);

void
quickbit_index_init_sparse (quickbit_index_t index, const quickbit_chunk_t chunks[], size_t len);

bool
quickbit_index_update (quickbit_index_t index, const quickbit_t field, size_t len, int64_t bit);

bool
quickbit_index_update_sparse (quickbit_index_t index, const quickbit_chunk_t chunks[], size_t len, int64_t bit);

int64_t
quickbit_skip_first (quickbit_index_t index, size_t len, bool value, int64_t position);

int64_t
quickbit_skip_last (quickbit_index_t index, size_t len, bool value, int64_t position);

#ifdef __cplusplus
}
#endif

#endif // QUICKBIT_H
