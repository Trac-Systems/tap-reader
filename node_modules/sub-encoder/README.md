# sub-encoder
Generate sub encodings for key/value stores

### Usage
```js
const enc = new SubEncoder()
const subA = enc.sub('sub-a')
const subB = enc.sub('sub-b', 'binary') // subs support custom key encodings

await bee.put('k1', 'b')
await bee.put('a1', 'a1', { keyEncoding: subA })
await bee.put('b1', 'b1', { keyEncoding: subB })

// k1 as normal
await bee.get('k1')
// a1 from the sub
await bee.get('a1', { keyEncoding: subA })

// also supports read streams
for await (const node of bee.createReadStream({ keyEncoding: subA })) {
  // Iterates everything in the A sub
}

// The range options will be encoded properly too
for await (const node of bee.createReadStream({ lt: 'b2' }, { keyEncoding: subB })) {
}
```

### API

#### `const enc = new SubEncoder([prefix, encoding])`

Create a new SubEncoder. Optionally set the initial prefix and encoding.

`prefix` can be string or Buffer. If set, acts as an initial sub instead of starting at the Hyperbee's base level.

#### `subEnc = enc.sub(prefix, [encoding])`

Make a new sub. Returns a SubEncoder, so subs can easily be nested.

`prefix` can be string or Buffer.

#### `buf = enc.encode(key)`

Encode a key.

#### `key = enc.decode(buf)`

Decode a key.

#### `encodedRange = enc.encodeRange(range)`

Encode a range.

### License
Apache-2.0
