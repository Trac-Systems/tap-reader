#ifndef CRC_H
#define CRC_H

#ifdef __cplusplus
extern "C" {
#endif

#include <stddef.h>
#include <stdint.h>

uint32_t
crc_u32 (const uint8_t *buf, size_t len);

#ifdef __cplusplus
}
#endif
#endif // CRC_H
