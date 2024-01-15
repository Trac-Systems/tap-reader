#ifndef SIMDLE_XOR_H
#define SIMDLE_XOR_H

#include "arch.h"
#include "vec.h"

// Bitwise XOR

inline simdle_v128_t
simdle_xor_v128_u8 (simdle_v128_t a, simdle_v128_t b) {
  simdle_v128_t vec;

#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u8 = veorq_u8(a.u8, b.u8);
#elif defined(SIMDLE_ARCH_INTEL_SSE2)
  vec.__intel = _mm_xor_si128(a.__intel, b.__intel);
#else
  for (int i = 0; i < 16; i++) {
    vec.u8[i] = a.u8[i] ^ b.u8[i];
  }
#endif

  return vec;
}

inline simdle_v128_t
simdle_xor_v128_u16 (simdle_v128_t a, simdle_v128_t b) {
  simdle_v128_t vec;

#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u16 = veorq_u16(a.u16, b.u16);
#elif defined(SIMDLE_ARCH_INTEL_SSE2)
  vec.__intel = _mm_xor_si128(a.__intel, b.__intel);
#else
  for (int i = 0; i < 8; i++) {
    vec.u16[i] = a.u16[i] ^ b.u16[i];
  }
#endif

  return vec;
}

inline simdle_v128_t
simdle_xor_v128_u32 (simdle_v128_t a, simdle_v128_t b) {
  simdle_v128_t vec;

#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u32 = veorq_u32(a.u32, b.u32);
#elif defined(SIMDLE_ARCH_INTEL_SSE2)
  vec.__intel = _mm_xor_si128(a.__intel, b.__intel);
#else
  for (int i = 0; i < 4; i++) {
    vec.u32[i] = a.u32[i] ^ b.u32[i];
  }
#endif

  return vec;
}

#endif // SIMDLE_XOR_H
