#ifndef CRC_ENDIAN_H
#define CRC_ENDIAN_H

#include <stdbool.h>
#include <stdint.h>

typedef enum crc__endianness crc__endianness_t;

enum crc__endianness {
  CRC_LE,
  CRC_BE
};

crc__endianness_t
crc__endianness ();

bool
crc__is_le ();

bool
crc__is_be ();

uint32_t
crc__swap_uint32 (uint32_t x);

uint32_t
crc__swap_uint32_if_be (uint32_t n);

#endif // CRC_ENDIAN_H
