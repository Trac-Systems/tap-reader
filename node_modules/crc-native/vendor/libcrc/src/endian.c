#include "endian.h"

// See https://github.com/nodejs/node/blob/master/src/util.h
static const union {
  uint8_t u8[2];
  uint16_t u16;
} byte_order = {{1, 0}};

crc__endianness_t
crc__endianness () {
  return byte_order.u16 == 1 ? CRC_LE : CRC_BE;
}

bool
crc__is_le () {
  return crc__endianness() == CRC_LE;
}

bool
crc__is_be () {
  return crc__endianness() == CRC_BE;
}

uint32_t
crc__swap_uint32 (uint32_t x) {
  return ((x & 0x000000ff) << 24) |
         ((x & 0x0000ff00) << 8) |
         ((x & 0x00ff0000) >> 8) |
         ((x & 0xff000000) >> 24);
}

uint32_t
crc__swap_uint32_if_be (uint32_t n) {
  if (crc__is_le()) return n;
  return crc__swap_uint32(n);
}
