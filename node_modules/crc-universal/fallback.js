/**
 * The JavaScript implementation of CRC32 is a version of the slice-by-16 algorithm
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

const lookup = require('./lookup')

exports.crc32 = function crc32 (buffer) {
  let crc = ~0
  let i = 0
  let length = buffer.byteLength

  while (length >= 16) {
    crc = lookup[15][buffer[i++] ^ (crc & 0xff)] ^
          lookup[14][buffer[i++] ^ ((crc >>> 8) & 0xff)] ^
          lookup[13][buffer[i++] ^ ((crc >>> 16) & 0xff)] ^
          lookup[12][buffer[i++] ^ (crc >>> 24)] ^
          lookup[11][buffer[i++]] ^
          lookup[10][buffer[i++]] ^
          lookup[9][buffer[i++]] ^
          lookup[8][buffer[i++]] ^
          lookup[7][buffer[i++]] ^
          lookup[6][buffer[i++]] ^
          lookup[5][buffer[i++]] ^
          lookup[4][buffer[i++]] ^
          lookup[3][buffer[i++]] ^
          lookup[2][buffer[i++]] ^
          lookup[1][buffer[i++]] ^
          lookup[0][buffer[i++]]

    length -= 16
  }

  while (length-- > 0) {
    crc = (crc >>> 8) ^ lookup[0][(crc & 0xff) ^ buffer[i++]]
  }

  return ~crc >>> 0
}
