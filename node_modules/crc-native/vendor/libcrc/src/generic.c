/**
 * The generic implementation of CRC32 is a version of the slice-by-16 algorithm
 * as implemented by Stephan Brumme, see https://github.com/stbrumme/crc32.
 *
 * Copyright (c) 2011-2016 Stephan Brumme
 *
 * This software is provided 'as-is', without any express or implied warranty.
 * In no event will the authors be held liable for any damages arising from the
 * use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it freely,
 * subject to the following restrictions:
 *
 * 1. The origin of this software must not be misrepresented; you must not claim
 *    that you wrote the original software.
 *    If you use this software in a product, an acknowledgment in the product
 *    documentation would be appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

#include <stddef.h>
#include <stdint.h>

#include "../include/crc.h"
#include "arch.h"
#include "endian.h"
#include "lookup.h"

#ifdef CRC_ARCH_GENERIC

uint32_t
crc_u32 (const uint8_t *buf, size_t len) {
  uint32_t crc = ~0;

  const uint32_t *view = (const uint32_t *) buf;

  while (len >= 64) {
    for (int i = 0; i < 4; i++) {
      uint32_t a = *view++ ^ crc__swap_uint32_if_be(crc);
      uint32_t b = *view++;
      uint32_t c = *view++;
      uint32_t d = *view++;

      if (crc__is_be()) {
        crc = crc__lookup[0][d & 0xff] ^
              crc__lookup[1][(d >> 8) & 0xff] ^
              crc__lookup[2][(d >> 16) & 0xff] ^
              crc__lookup[3][(d >> 24) & 0xff] ^
              crc__lookup[4][c & 0xff] ^
              crc__lookup[5][(c >> 8) & 0xff] ^
              crc__lookup[6][(c >> 16) & 0xff] ^
              crc__lookup[7][(c >> 24) & 0xff] ^
              crc__lookup[8][b & 0xff] ^
              crc__lookup[9][(b >> 8) & 0xff] ^
              crc__lookup[10][(b >> 16) & 0xff] ^
              crc__lookup[11][(b >> 24) & 0xff] ^
              crc__lookup[12][a & 0xff] ^
              crc__lookup[13][(a >> 8) & 0xff] ^
              crc__lookup[14][(a >> 16) & 0xff] ^
              crc__lookup[15][(a >> 24) & 0xff];
      } else {
        crc = crc__lookup[0][(d >> 24) & 0xff] ^
              crc__lookup[1][(d >> 16) & 0xff] ^
              crc__lookup[2][(d >> 8) & 0xff] ^
              crc__lookup[3][d & 0xff] ^
              crc__lookup[4][(c >> 24) & 0xff] ^
              crc__lookup[5][(c >> 16) & 0xff] ^
              crc__lookup[6][(c >> 8) & 0xff] ^
              crc__lookup[7][c & 0xff] ^
              crc__lookup[8][(b >> 24) & 0xff] ^
              crc__lookup[9][(b >> 16) & 0xff] ^
              crc__lookup[10][(b >> 8) & 0xff] ^
              crc__lookup[11][b & 0xff] ^
              crc__lookup[12][(a >> 24) & 0xff] ^
              crc__lookup[13][(a >> 16) & 0xff] ^
              crc__lookup[14][(a >> 8) & 0xff] ^
              crc__lookup[15][a & 0xff];
      }
    }

    len -= 64;
  }

  buf = (const uint8_t *) view;

  while (len-- > 0) {
    crc = (crc >> 8) ^ crc__lookup[0][(crc & 0xff) ^ *buf++];
  }

  return ~crc;
}

#endif
