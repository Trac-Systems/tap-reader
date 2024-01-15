#ifndef SIMDLE_CTZ_H
#define SIMDLE_CTZ_H

#include "arch.h"
#include "vec.h"

// Count trailing zeroes (ctz)

inline simdle_v128_t
simdle_ctz_v128_u8 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u8 = vclzq_u8(vrbitq_u8(vec.u8));
#elif defined(SIMDLE_ARCH_INTEL_BMI)
  for (int i = 0; i < 16; i++) {
    uint32_t c = _tzcnt_u32(vec.u8[i]);
    vec.u8[i] = c > 8 ? 8 : c;
  }
#else
  for (int i = 0; i < 16; i++) {
    uint8_t x = vec.u8[i];
    uint8_t r;
    uint8_t q;

    if (x == 0) {
      vec.u8[i] = 8;
    } else {
      x &= -x;
      r = (x > 0xf) << 2;
      x >>= r;
      q = (x > 0x3) << 1;
      x >>= q;
      r |= q;
      r |= (x >> 1);

      vec.u8[i] = r;
    }
  }
#endif

  return vec;
}

inline simdle_v128_t
simdle_ctz_v128_u16 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u8 = vrev16q_u8(vrbitq_u8(vec.u8));
  vec.u16 = vclzq_u16(vec.u16);
#elif defined(SIMDLE_ARCH_INTEL_BMI)
  for (int i = 0; i < 8; i++) {
    uint32_t c = _tzcnt_u32(vec.u8[i]);
    vec.u8[i] = c > 16 ? 16 : c;
  }
#else
  for (int i = 0; i < 8; i++) {
    uint16_t x = vec.u16[i];
    uint16_t r;
    uint16_t q;

    if (x == 0) {
      vec.u16[i] = 16;
    } else {
      x &= -x;
      r = (x > 0xff) << 3;
      x >>= r;
      q = (x > 0xf) << 2;
      x >>= q;
      r |= q;
      q = (x > 0x3) << 1;
      x >>= q;
      r |= q;
      r |= (x >> 1);

      vec.u16[i] = r;
    }
  }
#endif

  return vec;
}

inline simdle_v128_t
simdle_ctz_v128_u32 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u8 = vrev32q_u8(vrbitq_u8(vec.u8));
  vec.u32 = vclzq_u32(vec.u32);
#elif defined(SIMDLE_ARCH_INTEL_BMI)
  for (int i = 0; i < 4; i++) {
    vec.u32[i] = _tzcnt_u32(vec.u32[i]);
  }
#else
  for (int i = 0; i < 4; i++) {
    uint32_t x = vec.u32[i];
    uint32_t r;
    uint32_t q;

    if (x == 0) {
      vec.u32[i] = 32;
    } else {
      x &= -x;
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

      vec.u32[i] = r;
    }
  }
#endif

  return vec;
}

#endif // SIMDLE_CTZ_H
