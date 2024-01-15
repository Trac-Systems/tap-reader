#ifndef SIMDLE_SUM_H
#define SIMDLE_SUM_H

#include "arch.h"
#include "vec.h"

inline uint16_t
simdle_sum_v128_u8 (simdle_v128_t vec) {
  uint16_t r = 0;

#if defined(SIMDLE_ARCH_ARM_NEON)
  r = vaddlvq_u8(vec.u8);
#else
  for (int i = 0; i < 16; i++) {
    r += vec.u8[i];
  }
#endif

  return r;
}

inline uint32_t
simdle_sum_v128_u16 (simdle_v128_t vec) {
  uint32_t r = 0;

#if defined(SIMDLE_ARCH_ARM_NEON)
  r = vaddlvq_u16(vec.u16);
#else
  for (int i = 0; i < 8; i++) {
    r += vec.u16[i];
  }
#endif

  return r;
}

inline uint64_t
simdle_sum_v128_u32 (simdle_v128_t vec) {
  uint64_t r = 0;

#if defined(SIMDLE_ARCH_ARM_NEON)
  r = vaddlvq_u32(vec.u32);
#else
  for (int i = 0; i < 4; i++) {
    r += vec.u32[i];
  }
#endif

  return r;
}

#endif // SIMDLE_SUM_H
