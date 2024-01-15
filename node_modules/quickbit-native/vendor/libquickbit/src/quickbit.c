#include <simdle.h>
#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

#include "../include/quickbit.h"

static inline bool
quickbit_get_unchecked (const quickbit_t field, uint64_t bit) {
  uint64_t offset = bit & 7;
  uint64_t i = bit / 8;

  return (field[i] & (1 << offset)) != 0;
}

bool
quickbit_get (const quickbit_t field, size_t len, int64_t bit) {
  int64_t n = len * 8;

  if (bit < 0) bit += n;
  if (bit < 0 || bit >= n) return false;

  return quickbit_get_unchecked(field, (uint64_t) bit);
}

static inline bool
quickbit_set_unchecked (quickbit_t field, uint64_t bit, bool value) {
  uint64_t offset = bit & 7;
  uint64_t i = bit / 8;
  uint64_t mask = 1 << offset;

  if (value) {
    if ((field[i] & mask) != 0) {
      return false;
    }
  } else {
    if ((field[i] & mask) == 0) {
      return false;
    }
  }

  field[i] ^= mask;

  return true;
}

bool
quickbit_set (quickbit_t field, size_t len, int64_t bit, bool value) {
  int64_t n = len * 8;

  if (bit < 0) bit += n;
  if (bit < 0 || bit >= n) return false;

  return quickbit_set_unchecked(field, (uint64_t) bit, value);
}

void
quickbit_fill (const quickbit_t field, size_t len, bool value, int64_t start, int64_t end) {
  int64_t n = len * 8;

  if (start < 0) start += n;
  if (end < 0) end += n;
  if (start < 0 || start >= n || start >= end) return;

  int64_t i = start / 8;
  int64_t j = end / 8;

  {
    int64_t offset = start & 7;

    if (offset != 0) {
      uint8_t shift = 8 - offset;
      if (end - start < shift) shift = end - start;

      uint8_t mask = ((1 << shift) - 1) << offset;

      if (value) field[i] |= mask;
      else field[i] &= ~mask;

      i++;
    }
  }

  {
    int64_t offset = end & 7;

    if (offset != 0 && j >= i) {
      uint8_t mask = (1 << offset) - 1;

      if (value) field[j] |= mask;
      else field[j] &= ~mask;
    }
  }

  if (i < j) memset(&field[i], value ? 0xff : 0, j - i);
}

void
quickbit_clear (const quickbit_t field, size_t len, const quickbit_chunk_t *chunk) {
  if (chunk->offset >= len) return;

  int64_t n = len;
  int64_t m = chunk->len;

  int64_t i = chunk->offset;
  int64_t j = 0;

  while (((i & 15) != 0 || (j & 15) != 0) && i < n && j < m) {
    field[i] = field[i] & ~chunk->field[j];
    i++;
    j++;
  }

  while (i + 15 < n && j + 15 < m) {
    simdle_v128_t a = simdle_load_v128_u8(&field[i]);
    simdle_v128_t b = simdle_load_v128_u8(&chunk->field[j]);

    simdle_store_v128_u8(&field[i], simdle_clear_v128_u8(a, b));

    i += 16;
    j += 16;
  }

  while (i < n && j < m) {
    field[i] = field[i] & ~chunk->field[j];
    i++;
    j++;
  }
}

int64_t
quickbit_find_first (const quickbit_t field, size_t len, bool value, int64_t position) {
  int64_t n = len * 8;

  if (position < 0) position += n;
  if (position < 0) position = 0;
  if (position >= n) return -1;

  int64_t i = position;

  while ((i & 127) != 0 && i < n) {
    if (quickbit_get_unchecked(field, i) == value) return i;
    i++;
  }

  while (i + 127 < n) {
    simdle_v128_t v = simdle_load_v128_u8(&field[i / 8]);
    simdle_v128_t t = value ? simdle_ctz_v128_u32(v) : simdle_cto_v128_u32(v);

    int16_t offset = 0;

    for (int j = 0; j < 4; j++) {
      int16_t v = t.u32[j];
      offset += v;
      if (v != 32) return i + offset;
    }

    i += 128;
  }

  while (i < n) {
    if (quickbit_get_unchecked(field, i) == value) return i;
    i++;
  }

  return -1;
}

int64_t
quickbit_find_last (const quickbit_t field, size_t len, bool value, int64_t position) {
  int64_t n = len * 8;

  if (position < 0) position += n;
  if (position < 0) return -1;
  if (position >= n) position = n - 1;

  int64_t i = position;

  while ((i & 127) != 127 && i >= 0) {
    if (quickbit_get_unchecked(field, i) == value) return i;
    i--;
  }

  while (i - 127 >= 0) {
    simdle_v128_t v = simdle_load_v128_u8(&field[(i - 127) / 8]);
    simdle_v128_t t = value ? simdle_clz_v128_u32(v) : simdle_clo_v128_u32(v);

    int16_t offset = 0;

    for (int j = 3; j >= 0; j--) {
      int16_t v = t.u32[j];
      offset += v;
      if (v != 32) return i - offset;
    }

    i -= 128;
  }

  while (i >= 0) {
    if (quickbit_get_unchecked(field, i) == value) return i;
    i--;
  }

  return -1;
}

static inline const quickbit_chunk_t *
quickbit_select_chunk (const quickbit_chunk_t chunks[], size_t len, int64_t offset) {
  for (size_t i = 0; i < len; i++) {
    const quickbit_chunk_t *next = &chunks[i];

    int64_t start = next->offset;
    int64_t end = next->offset + next->len;

    if (offset >= start && offset + 16 <= end) {
      return next;
    }
  }

  return NULL;
}

static inline int64_t
quickbit_index_bit_offset (bool bit, int64_t offset) {
  return bit == 0 ? offset : (QUICKBIT_INDEX_LEN * 8 / 2) + offset;
}

static inline int64_t
quickbit_index_byte_offset (bool bit, int64_t offset) {
  return bit == 0 ? offset : (QUICKBIT_INDEX_LEN / 2) + offset;
}

void
quickbit_index_init (quickbit_index_t index, const quickbit_t field, size_t len) {
  for (int64_t i = 0; i < 128; i++) {
    for (int64_t j = 0; j < 128; j++) {
      int64_t offset = (i * 128 + j) * 16;
      bool allz = true;
      bool allo = false;

      if (offset + 16 <= (int64_t) len) {
        simdle_v128_t vec = simdle_load_v128_u8(&field[offset]);

        allz = simdle_allz_v128(vec);
        allo = simdle_allo_v128(vec);
      }

      int64_t k = i * 128 + 128 + j;

      quickbit_set_unchecked(index, quickbit_index_bit_offset(0, k), allz);
      quickbit_set_unchecked(index, quickbit_index_bit_offset(1, k), allo);
    }

    bool allo;

    allo = simdle_allo_v128(simdle_load_v128_u8(&index[quickbit_index_byte_offset(0, i * 16 + 16)]));

    quickbit_set_unchecked(index, quickbit_index_bit_offset(0, i), allo);

    allo = simdle_allo_v128(simdle_load_v128_u8(&index[quickbit_index_byte_offset(1, i * 16 + 16)]));

    quickbit_set_unchecked(index, quickbit_index_bit_offset(1, i), allo);
  }
}

void
quickbit_index_init_sparse (quickbit_index_t index, const quickbit_chunk_t chunks[], size_t len) {
  for (int64_t i = 0; i < 128; i++) {
    for (int64_t j = 0; j < 128; j++) {
      int64_t offset = (i * 128 + j) * 16;
      bool allz = true;
      bool allo = false;

      const quickbit_chunk_t *chunk = quickbit_select_chunk(chunks, len, offset);

      if (chunk != NULL) {
        simdle_v128_t vec = simdle_load_v128_u8(&chunk->field[offset - chunk->offset]);

        allz = simdle_allz_v128(vec);
        allo = simdle_allo_v128(vec);
      }

      int64_t k = i * 128 + 128 + j;

      quickbit_set_unchecked(index, quickbit_index_bit_offset(0, k), allz);
      quickbit_set_unchecked(index, quickbit_index_bit_offset(1, k), allo);
    }

    bool allo;

    allo = simdle_allo_v128(simdle_load_v128_u8(&index[quickbit_index_byte_offset(0, i * 16 + 16)]));

    quickbit_set_unchecked(index, quickbit_index_bit_offset(0, i), allo);

    allo = simdle_allo_v128(simdle_load_v128_u8(&index[quickbit_index_byte_offset(1, i * 16 + 16)]));

    quickbit_set_unchecked(index, quickbit_index_bit_offset(1, i), allo);
  }
}

static inline bool
quickbit_index_update_propagate (quickbit_index_t index, int64_t bit, simdle_v128_t vec) {
  int64_t i = bit / 16384;
  int64_t j = bit / 128;

  bool allz = simdle_allz_v128(vec);
  bool allo = simdle_allo_v128(vec);

  bool changed = false;

  if (quickbit_set_unchecked(index, quickbit_index_bit_offset(0, 128 + j), allz)) {
    changed = true;
    {
      bool allo = simdle_allo_v128(simdle_load_v128_u8(&index[quickbit_index_byte_offset(0, i * 16 + 16)]));

      quickbit_set_unchecked(index, quickbit_index_bit_offset(0, i), allo);
    }
  }

  if (quickbit_set_unchecked(index, quickbit_index_bit_offset(1, 128 + j), allo)) {
    changed = true;
    {
      bool allo = simdle_allo_v128(simdle_load_v128_u8(&index[quickbit_index_byte_offset(1, i * 16 + 16)]));

      quickbit_set_unchecked(index, quickbit_index_bit_offset(1, i), allo);
    }
  }

  return changed;
}

bool
quickbit_index_update (quickbit_index_t index, const quickbit_t field, size_t len, int64_t bit) {
  int64_t n = len * 8;

  if (bit < 0) bit += n;
  if (bit < 0 || bit >= n) return false;

  return quickbit_index_update_propagate(index, bit, simdle_load_v128_u8(&field[bit / 128 * 16]));
}

bool
quickbit_index_update_sparse (quickbit_index_t index, const quickbit_chunk_t chunks[], size_t len, int64_t bit) {
  if (len == 0) return false;

  const quickbit_chunk_t *last = &chunks[len - 1];

  int64_t n = (last->offset + last->len) * 8;

  if (bit < 0) bit += n;
  if (bit < 0 || bit >= n) return false;

  int64_t offset = bit / 128 * 16;

  const quickbit_chunk_t *chunk = quickbit_select_chunk(chunks, len, offset);

  if (chunk == NULL) return false;

  return quickbit_index_update_propagate(index, bit, simdle_load_v128_u8(&chunk->field[offset - chunk->offset]));
}

int64_t
quickbit_skip_first (quickbit_index_t index, size_t len, bool value, int64_t position) {
  int64_t n = len * 8;

  if (position < 0) position += n;
  if (position < 0) position = 0;
  if (position >= n) return n - 1;

  int64_t i = position / 16384;

  if (i > 127) return position;

  while (i <= 127 && quickbit_get_unchecked(index, quickbit_index_bit_offset(value, i))) {
    i++;
  }

  if (i == 128) return n - 1;

  int64_t k = i * 16384;
  int64_t j = 0;

  if (position > k) j = (position - k) / 128;

  while (j <= 127 && quickbit_get_unchecked(index, quickbit_index_bit_offset(value, i * 128 + j + 128))) {
    j++;
    k += 128;
  }

  if (j == 128 && i != 127) return quickbit_skip_first(index, len, value, (i + 1) * 16384);

  if (k > position) position = k;

  return position < n ? position : n - 1;
}

int64_t
quickbit_skip_last (quickbit_index_t index, size_t len, bool value, int64_t position) {
  int64_t n = len * 8;

  if (position < 0) position += n;
  if (position < 0) return 0;
  if (position >= n) position = n - 1;

  int64_t i = position / 16384;

  if (i > 127) return position;

  while (i >= 0 && quickbit_get_unchecked(index, quickbit_index_bit_offset(value, i))) {
    i--;
  }

  if (i == -1) return 0;

  int64_t k = ((i + 1) * 16384) - 1;
  int64_t j = 127;

  if (position < k) j = 128 - ((k - position) + 127) / 128;

  while (j >= 0 && quickbit_get_unchecked(index, quickbit_index_bit_offset(value, i * 128 + j + 128))) {
    j--;
    k -= 128;
  }

  if (j == -1 && i != 0) return quickbit_skip_last(index, len, value, i * 16384 - 1);

  if (k < position) position = k;

  return position;
}
