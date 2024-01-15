const lookup = new Array(16)

for (let i = 0; i < 16; i++) {
  lookup[i] = new Uint32Array(0x100)
}

for (let i = 0; i <= 0xff; i++) {
  let crc = i

  for (let j = 0; j < 8; j++) {
    crc = (crc >>> 1) ^ ((crc & 1) * 0xedb88320)
  }

  lookup[0][i] = crc
}

for (let i = 0; i <= 0xff; i++) {
  for (let j = 1; j < 16; j++) {
    lookup[j][i] = (lookup[j - 1][i] >>> 8) ^ lookup[0][lookup[j - 1][i] & 0xff]
  }
}

module.exports = lookup
