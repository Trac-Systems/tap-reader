#ifndef SIMDLE_STORE_H
#define SIMDLE_STORE_H

#include <string.h>

#include "arch.h"
#include "vec.h"

inline void
simdle_store_v128_u8 (uint8_t arr[], simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vst1q_u8(arr, vec.u8);
#else
  memcpy(arr, &vec, sizeof(vec));
#endif
}

inline void
simdle_store_v128_u16 (uint16_t arr[], simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u16 = vld1q_u16(arr);
  vst1q_u16(arr, vec.u16);
#else
  memcpy(arr, &vec, sizeof(vec));
#endif
}

inline void
simdle_store_v128_u32 (uint32_t arr[], simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vst1q_u32(arr, vec.u32);
#else
  memcpy(arr, &vec, sizeof(vec));
#endif
}

#endif // SIMDLE_STORE_H
