#ifndef SIMDLE_CLO_H
#define SIMDLE_CLO_H

#include "arch.h"
#include "clz.h"
#include "not.h"
#include "vec.h"

// Count leading ones (clo)

inline simdle_v128_t
simdle_clo_v128_u8 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u8 = vclzq_u8(vmvnq_u8(vec.u8));
#else
  vec = simdle_clz_v128_u8(simdle_not_v128_u8(vec));
#endif

  return vec;
}

inline simdle_v128_t
simdle_clo_v128_u16 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u16 = vclzq_u16(vmvnq_u16(vec.u16));
#else
  vec = simdle_clz_v128_u16(simdle_not_v128_u16(vec));
#endif

  return vec;
}

inline simdle_v128_t
simdle_clo_v128_u32 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  vec.u32 = vclzq_u32(vmvnq_u32(vec.u32));
#else
  vec = simdle_clz_v128_u32(simdle_not_v128_u32(vec));
#endif

  return vec;
}

#endif // SIMDLE_CLO_H
