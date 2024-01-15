#ifndef SIMDLE_LOAD_H
#define SIMDLE_LOAD_H

#include <string.h>

#include "arch.h"
#include "vec.h"

inline simdle_v128_t
simdle_load_v128_u8 (const uint8_t arr[]) {
  simdle_v128_t vec;

#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u8 = vld1q_u8(arr);
#else
  memcpy(&vec, arr, sizeof(vec));
#endif

  return vec;
}

inline simdle_v128_t
simdle_load_v128_u16 (const uint16_t arr[]) {
  simdle_v128_t vec;

#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u16 = vld1q_u16(arr);
#else
  memcpy(&vec, arr, sizeof(vec));
#endif

  return vec;
}

inline simdle_v128_t
simdle_load_v128_u32 (const uint32_t arr[]) {
  simdle_v128_t vec;

#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u32 = vld1q_u32(arr);
#else
  memcpy(&vec, arr, sizeof(vec));
#endif

  return vec;
}

#endif // SIMDLE_LOAD_H
