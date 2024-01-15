# quickbit-universal

Universal wrapper for https://github.com/holepunchto/libquickbit with a JavaScript fallback.

```sh
npm install quickbit-universal
```

## Usage

```js
const { get, set, findFirst } = require('quickbit-native')

const field = Buffer.alloc(256) // 2048 bits

const changed = set(field, 1000)
// true

get(field, 1000)
// true

findFirst(field, true)
// 1000
```

## API

#### `const b = get(field, bit)`

Get the given bit, which will either be `true` (set) or `false` (unset).

#### `const changed = set(field, bit[, value])`

Set the given bit to `value`, which defaults to `true`. Returns `true` if the bit changed, otherwise `false`.

#### `field = fill(field, value[, start[, end]])`

Fill the given bit range with `value`. `start` defaults to `0` and `end` defaults to the bit length of the field. Returns the modified field.

#### `clear(field, chunk)`

Clear the bits from `field` that are set in the `{ field, offset }` chunk.

#### `const i = findFirst(field, value[, position])`

Return the index of the first occurrence of `value`, or `-1` if not found. If `position` is given, return the first index that is greater than or equal to `position`.

#### `const i = findLast(field, value[, position])`

Return the index of the last occurrence of `value`, or `-1` if not found. If `position` is given, return the last index that is less than or equal to `position`.

### Indexing

#### `const index = Index.from(fieldOrChunks)`

Construct an index of the bits in a bit field or an array of sparse `{ field, offset }` chunks.

#### `const changed = index.update(bit)`

Update the given bit in the index.

#### `const position = index.skipFirst(value[, position])`

Skip the first parts of the index that contain nothing but `value`. If the index contains *only* `value`, the last index of the field is returned.

#### `const position = index.skipLast(value[, position])`

Skip the last parts of the index that contain nothing but `value`. If the index contains *only* `value`, the first index of the field is returned.

## License

Apache 2.0
