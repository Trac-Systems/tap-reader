# crc-native

https://github.com/holepunchto/libcrc JavaScript bindings for Node.js.

```sh
npm install crc-native
```

## Usage

```js
const { crc32 } = require('crc-native')

const crc = crc32(Buffer.from('hello world'))
// 0xd4a1185
```

## API

#### `const crc = crc32(buffer)`

Compute the CRC32 of the given buffer.

## License

Apache-2.0
