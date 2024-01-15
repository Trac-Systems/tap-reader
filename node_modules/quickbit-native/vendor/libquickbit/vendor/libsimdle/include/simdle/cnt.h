#ifndef SIMDLE_CNT_H
#define SIMDLE_CNT_H

#include "arch.h"
#include "vec.h"

// Population count (cnt)

inline simdle_v128_t
simdle_cnt_v128_u8 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u8 = vcntq_u8(vec.u8);
#elif defined(SIMDLE_ARCH_INTEL_AVX512BITALG) && defined(SIMDLE_ARCH_INTEL_AVX512VL)
  vec.__intel = _mm_popcnt_epi8(vec.__intel);
#else
  for (size_t i = 0; i < 16; i++) {
    uint32_t v = vec.u8[i];
    v -= ((v >> 1) & 0x55555555);
    v = ((v & 0x33333333) + ((v >> 2) & 0x33333333));
    v = (v + (v >> 4)) & 0xf0f0f0f;
    v = (v * 0x1010101) >> 24;
    vec.u8[i] = v;
  }
#endif

  return vec;
}

inline simdle_v128_t
simdle_cnt_v128_u16 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u16 = vpaddlq_u8(vcntq_u8(vec.u8));
#elif defined(SIMDLE_ARCH_INTEL_AVX512BITALG) && defined(SIMDLE_ARCH_INTEL_AVX512VL)
  vec.__intel = _mm_popcnt_epi16(vec.__intel);
#else
  for (size_t i = 0; i < 8; i++) {
    uint32_t v = vec.u16[i];
    v -= ((v >> 1) & 0x55555555);
    v = ((v & 0x33333333) + ((v >> 2) & 0x33333333));
    v = (v + (v >> 4)) & 0xf0f0f0f;
    v = (v * 0x1010101) >> 24;
    vec.u16[i] = v;
  }
#endif

  return vec;
}

inline simdle_v128_t
simdle_cnt_v128_u32 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u32 = vpaddlq_u16(vpaddlq_u8(vcntq_u8(vec.u8)));
#elif defined(SIMDLE_ARCH_INTEL_AVX512VPOPCNTDQ) && defined(SIMDLE_ARCH_INTEL_AVX512VL)
  vec.__intel = _mm_popcnt_epi32(vec.__intel);
#else
  for (size_t i = 0; i < 4; i++) {
    uint32_t v = vec.u32[i];
    v -= ((v >> 1) & 0x55555555);
    v = ((v & 0x33333333) + ((v >> 2) & 0x33333333));
    v = (v + (v >> 4)) & 0xf0f0f0f;
    v = (v * 0x1010101) >> 24;
    vec.u32[i] = v;
  }
#endif

  return vec;
}

#endif // SIMDLE_CNT_H
