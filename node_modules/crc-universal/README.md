# crc-universal

Universal wrapper for https://github.com/holepunchto/libcrc with a JavaScript fallback.

```sh
npm install crc-universal
```

## Usage

```js
const { crc32 } = require('crc-universal')

const crc = crc32(Buffer.from('hello world'))
// 0xd4a1185
```

## API

#### `const crc = crc32(buffer)`

Compute the CRC32 of the given buffer.

## License

ISC
