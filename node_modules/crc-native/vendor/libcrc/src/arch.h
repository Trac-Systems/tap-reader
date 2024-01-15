#ifndef CRC_ARCH_H
#define CRC_ARCH_H

#ifndef CRC_FORCE_FALLBACK
#if defined(__aarch64__) && defined(__ARM_NEON) && defined(__ARM_FEATURE_CRC32)
#define CRC_ARCH_ARM
#else
#define CRC_ARCH_GENERIC
#endif
#else
#define CRC_ARCH_GENERIC
#endif

#endif // CRC_ARCH_H
