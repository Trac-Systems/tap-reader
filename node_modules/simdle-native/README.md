# simdle-native

https://github.com/holepunchto/libsimdle JavaScript bindings for Node.js.

```sh
npm install simdle-native
```

## Usage

```js
const { cnt } = require('simdle-native')

cnt(Buffer.alloc(16, 0xff))
// <Buffer 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08 08>
```

## API

The lane width of all APIs is determined by the input buffer. That is, if providing a `Uint8Array` the lane width will be 8 bits, if providing a `Uint16Array` the lane width will be 16 bits and so on.

#### `const result = allo(buffer)`

Check if the buffer contains only ones.

#### `const result = allz(buffer)`

Check if the buffer contains only zeros.

#### `const result = and(a, b[, result])`

Compute the bitwise AND of `a` and `b`. If `result` is not provided, a fresh buffer is allocated. The `result` buffer is returned to the caller.

#### `const result = clear(a, b[, result])`

Clear the bits in `b` from `a`. If `result` is not provided, a fresh buffer is allocated. The `result` buffer is returned to the caller.

#### `const result = clo(buffer[, result])`

Count the number of leading ones in `buffer`, storing the result in `result`. If `result` is not provided, a fresh buffer is allocated. The `result` buffer is returned to the caller.

#### `const result = clz(buffer[, result])`

Count the number of leading zeroes in `buffer`, storing the result in `result`. If `result` is not provided, a fresh buffer is allocated. The `result` buffer is returned to the caller.

#### `const result = cnt(buffer[, result])`

Compute the population count in `buffer`, storing the result in `result`. If `result` is not provided, a fresh buffer is allocated. The `result` buffer is returned to the caller.

#### `const result = cto(buffer[, result])`

Count the number of trailing ones in `buffer`, storing the result in `result`. If `result` is not provided, a fresh buffer is allocated. The `result` buffer is returned to the caller.

#### `const result = ctz(buffer[, result])`

Count the number of trailing zeroes in `buffer`, storing the result in `result`. If `result` is not provided, a fresh buffer is allocated. The `result` buffer is returned to the caller.

#### `const result = not(buffer[, result])`

Compute the bitwise NOT in `buffer`, storing the result in `result`. If `result` is not provided, a fresh buffer is allocated. The `result` buffer is returned to the caller.

#### `const result = or(a, b[, result])`

Compute the bitwise OR of `a` and `b`. If `result` is not provided, a fresh buffer is allocated. The `result` buffer is returned to the caller.

#### `const result = sum(buffer)`

Compute the sum of `buffer` as a `bigint`.

#### `const result = xor(a, b[, result])`

Compute the bitwise XOR of `a` and `b`. If `result` is not provided, a fresh buffer is allocated. The `result` buffer is returned to the caller.

## License

Apache-2.0
