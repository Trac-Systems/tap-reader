# big-sparse-array

A sparse array optimised for low memory whilst still being fast.

```
npm install big-sparse-array
```

Uses a shallow tree structure with a branching factor of 4096
to index a series of small arrays that try to compress as much as possible
to reduce the memory overhead needed.

Similar to a Map, except it is faster, but might use a bit more memory, ymmv.

## Usage

``` js
const BigSparseArray = require('big-sparse-array')

const b = new BigSparseArray()

b.set(42422242525, true)
b.get(42422242525) // returns true
b.get(111111111) // returns undefined
```

## API

#### `const b = new BigSparseArray()`

Make a new sparse array.

#### `b.set(index, value)`

Insert a new value at an index. `index` must be a integer.

#### `value = b.get(index)`

Get a value out. Returns `undefined` if the value could not be found.

## License

MIT
