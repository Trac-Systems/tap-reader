#ifndef SIMDLE_ALLZ_H
#define SIMDLE_ALLZ_H

#include <stdbool.h>

#include "arch.h"
#include "vec.h"

// Check if all zeros

inline bool
simdle_allz_v128 (simdle_v128_t vec) {
#if defined(SIMDLE_ARCH_ARM_NEON)
  return (vgetq_lane_u64(vec.u64, 0) | vgetq_lane_u64(vec.u64, 1)) == (uint64_t) 0;
#elif defined(SIMDLE_ARCH_INTEL_SSE4_1)
  return _mm_test_all_zeros(vec.__intel, vec.__intel);
#else
  return (vec.u64[0] | vec.u64[1]) == (uint64_t) 0;
#endif
}

#endif // SIMDLE_ALLZ_H
