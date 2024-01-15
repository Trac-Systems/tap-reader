#ifndef SIMDLE_NOT_H
#define SIMDLE_NOT_H

#include "arch.h"
#include "vec.h"

// Bitwise NOT

inline simdle_v128_t
simdle_not_v128_u8 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u8 = vmvnq_u8(vec.u8);
#elif defined(SIMDLE_ARCH_INTEL_SSE2)
  vec.__intel = _mm_xor_si128(vec.__intel, _mm_cmpeq_epi8(vec.__intel, vec.__intel));
#else
  for (int i = 0; i < 16; i++) {
    vec.u8[i] = ~vec.u8[i];
  }
#endif

  return vec;
}

inline simdle_v128_t
simdle_not_v128_u16 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u16 = vmvnq_u16(vec.u16);
#elif defined(SIMDLE_ARCH_INTEL_SSE2)
  vec.__intel = _mm_xor_si128(vec.__intel, _mm_cmpeq_epi16(vec.__intel, vec.__intel));
#else
  for (int i = 0; i < 8; i++) {
    vec.u16[i] = ~vec.u16[i];
  }
#endif

  return vec;
}

inline simdle_v128_t
simdle_not_v128_u32 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u32 = vmvnq_u32(vec.u32);
#elif defined(SIMDLE_ARCH_INTEL_SSE2)
  vec.__intel = _mm_xor_si128(vec.__intel, _mm_cmpeq_epi32(vec.__intel, vec.__intel));
#else
  for (int i = 0; i < 4; i++) {
    vec.u32[i] = ~vec.u32[i];
  }
#endif

  return vec;
}

#endif // SIMDLE_NOT_H
