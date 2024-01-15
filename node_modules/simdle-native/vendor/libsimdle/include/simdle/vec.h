#ifndef SIMDLE_VEC_H
#define SIMDLE_VEC_H

#include <stdint.h>

#include "arch.h"

#if defined(_MSC_VER)
#define SIMDLE_VECTOR(name, type, size) type name[size / sizeof(type)]
#else
#define SIMDLE_VECTOR(name, type, size) type name __attribute__((vector_size(size), __aligned__(size)))
#endif

typedef SIMDLE_VECTOR(simdle_s8x16_t, int8_t, 16);
typedef SIMDLE_VECTOR(simdle_s16x8_t, int16_t, 16);
typedef SIMDLE_VECTOR(simdle_s32x4_t, int32_t, 16);
typedef SIMDLE_VECTOR(simdle_s64x2_t, int64_t, 16);

typedef SIMDLE_VECTOR(simdle_u8x16_t, uint8_t, 16);
typedef SIMDLE_VECTOR(simdle_u16x8_t, uint16_t, 16);
typedef SIMDLE_VECTOR(simdle_u32x4_t, uint32_t, 16);
typedef SIMDLE_VECTOR(simdle_u64x2_t, uint64_t, 16);

typedef union simdle_v128_u simdle_v128_t;

union simdle_v128_u {
  simdle_s8x16_t s8;
  simdle_s16x8_t s16;
  simdle_s32x4_t s32;
  simdle_s64x2_t s64;

  simdle_u8x16_t u8;
  simdle_u16x8_t u16;
  simdle_u32x4_t u32;
  simdle_u64x2_t u64;

#if defined(SIMDLE_ARCH_INTEL)
  __m128i __intel;
#endif
};

#endif // SIMDLE_VEC_H
