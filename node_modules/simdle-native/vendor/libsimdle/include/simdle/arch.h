#ifndef SIMDLE_ARCH_H
#define SIMDLE_ARCH_H

// Architecture

#if defined(__aarch64__)
#define SIMDLE_ARCH_ARM
#elif defined(__x86_64__)
#define SIMDLE_ARCH_INTEL
#else
#define SIMDLE_ARCH_GENERIC
#endif

// Features

#if defined(SIMDLE_ARCH_ARM)
#if defined(__ARM_NEON)
#define SIMDLE_ARCH_ARM_NEON
#endif
#endif

#if defined(SIMDLE_ARCH_INTEL)
#if defined(__SSE2__)
#define SIMDLE_ARCH_INTEL_SSE2
#endif
#if defined(__SSE4_1__)
#define SIMDLE_ARCH_INTEL_SSE4_1
#endif
#if defined(__SSE4_2__)
#define SIMDLE_ARCH_INTEL_SSE4_2
#endif
#if defined(__AVX__)
#define SIMDLE_ARCH_INTEL_AVX
#endif
#if defined(__AVX512CD__)
#define SIMDLE_ARCH_INTEL_AVX512CD
#endif
#if defined(__AVX512VL__)
#define SIMDLE_ARCH_INTEL_AVX512VL
#endif
#if defined(__AVX512BITALG__)
#define SIMDLE_ARCH_INTEL_AVX512BITALG
#endif
#if defined(__AVX512VPOPCNTDQ__)
#define SIMDLE_ARCH_INTEL_AVX512VPOPCNTDQ
#endif
#if defined(__BMI__)
#define SIMDLE_ARCH_INTEL_BMI
#endif
#endif

// Includes

#if defined(SIMDLE_ARCH_ARM_NEON)
#include <arm_neon.h>
#endif

#if defined(SIMDLE_ARCH_INTEL_AVX) || defined(SIMDLE_ARCH_INTEL_BMI)
#include <immintrin.h>
#elif defined(SIMDLE_ARCH_INTEL_SSE4_2)
#include <nmmintrin.h>
#elif defined(SIMDLE_ARCH_INTEL_SSE4_1)
#include <smmintrin.h>
#elif defined(SIMDLE_ARCH_INTEL_SSE2)
#include <emmintrin.h>
#endif

#endif // SIMDLE_ARCH_H
