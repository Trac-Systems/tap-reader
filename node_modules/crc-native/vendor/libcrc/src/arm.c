/**
 * The ARM implementation of CRC32 is based on the CRC32C library by Google,
 * see https://github.com/google/crc32c.
 *
 * Copyright (c) 2017 The CRC32C Authors
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of Google Inc. nor the names of its contributors may be
 *    used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

#include <stddef.h>
#include <stdint.h>

#include "../include/crc.h"
#include "arch.h"

#ifdef CRC_ARCH_ARM

#include <arm_acle.h>

uint32_t
crc_u32 (const uint8_t *buf, size_t len) {
  uint32_t crc = ~0;

  while (len >= 8) {
    crc = __crc32d(crc, *(const uint64_t *) buf);
    buf += 8;
    len -= 8;
  }

  if (len & 4) {
    crc = __crc32w(crc, *(const uint32_t *) buf);
    buf += 4;
  }

  if (len & 2) {
    crc = __crc32h(crc, *(const uint16_t *) buf);
    buf += 2;
  }

  if (len & 1) {
    crc = __crc32b(crc, *buf);
  }

  return ~crc;
}

#endif
