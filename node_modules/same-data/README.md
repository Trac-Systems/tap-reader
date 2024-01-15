# same-data

Deep equal with no deps and only for "data" objects, ie basic objects, arrays, primitives and typed arrays

```
npm install same-data
```

Designed to be simple and for data. Does NOT do anything magic for functions, symbols, recursive objects

## Usage

``` js
const sameData = require('same-data')

console.log(sameData(1, 1)) // true
console.log(sameData(1, 2)) // false
console.log(sameData({ foo: 1 }, { foo: 1 })) // true
console.log(sameData({ foo: 1 }, { foo: 1, bar: true })) // false
console.log(sameData({ foo: 1, nested: { a: 1 } }, { foo: 1, nested: { a: 1 } })) // true
console.log(sameData([{ a: 1 }, { b: 1 }], [{ a: 1 }, { b: 1 }])) // true
```

## License

MIT
