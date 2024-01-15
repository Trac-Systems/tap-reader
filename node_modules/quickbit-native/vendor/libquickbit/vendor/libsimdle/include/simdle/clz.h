#ifndef SIMDLE_CLZ_H
#define SIMDLE_CLZ_H

#include "arch.h"
#include "vec.h"

// Count leading zeroes (clz)

inline simdle_v128_t
simdle_clz_v128_u8 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u8 = vclzq_u8(vec.u8);
#elif defined(SIMDLE_ARCH_INTEL_BMI)
  for (int i = 0; i < 16; i++) {
    vec.u8[i] = 24 - _lzcnt_u32(vec.u8[i]);
  }
#else
  for (int i = 0; i < 16; i++) {
    uint8_t x = vec.u8[i];
    uint8_t r;
    uint8_t q;

    if (x == 0) {
      vec.u8[i] = 8;
    } else {
      r = (x > 0xf) << 2;
      x >>= r;
      q = (x > 0x3) << 1;
      x >>= q;
      r |= q;
      r |= (x >> 1);

      vec.u8[i] = 7 - r;
    }
  }
#endif

  return vec;
}

inline simdle_v128_t
simdle_clz_v128_u16 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u16 = vclzq_u16(vec.u16);
#elif defined(SIMDLE_ARCH_INTEL_BMI)
  for (int i = 0; i < 8; i++) {
    vec.u16[i] = 16 - _lzcnt_u32(vec.u16[i]);
  }
#else
  for (int i = 0; i < 8; i++) {
    uint16_t x = vec.u16[i];
    uint16_t r;
    uint16_t q;

    if (x == 0) {
      vec.u16[i] = 16;
    } else {
      r = (x > 0xff) << 3;
      x >>= r;
      q = (x > 0xf) << 2;
      x >>= q;
      r |= q;
      q = (x > 0x3) << 1;
      x >>= q;
      r |= q;
      r |= (x >> 1);

      vec.u16[i] = 15 - r;
    }
  }
#endif

  return vec;
}

inline simdle_v128_t
simdle_clz_v128_u32 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u32 = vclzq_u32(vec.u32);
#elif defined(SIMDLE_ARCH_INTEL_AVX512CD) && defined(SIMDLE_ARCH_INTEL_AVX512VL)
  vec.u32 = _mm_lzcnt_epi32(vec.u32);
#else
  for (int i = 0; i < 4; i++) {
    uint32_t x = vec.u32[i];
    uint32_t r;
    uint32_t q;

    if (x == 0) {
      vec.u32[i] = 32;
    } else {
      r = (x > 0xffff) << 4;
      x >>= r;
      q = (x > 0xff) << 3;
      x >>= q;
      r |= q;
      q = (x > 0xf) << 2;
      x >>= q;
      r |= q;
      q = (x > 0x3) << 1;
      x >>= q;
      r |= q;
      r |= (x >> 1);

      vec.u32[i] = 31 - r;
    }
  }
#endif

  return vec;
}

#endif // SIMDLE_CLZ_H
