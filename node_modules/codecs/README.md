# codecs

Create an binary encoder/decoder for Node's build in types like, json, utf-8, hex.

```
npm install codecs
```

Useful to support value encodings similar to leveldb's.

## Usage

``` js
const codecs = require('codecs')
const json = codecs('json')

console.log(json.encode({ hello: 'world' })) // Buffer.from('{"hello":"world"}')
console.log(json.decode(new Buffer('{"hello":"world"}'))) // { hello: 'world' }
```

## API

#### `const codec = codecs(type, [fallback])`

Create a new codec.

Supported types are

* utf8
* json
* [ndjson](http://ndjson.org/)
* binary
* hex
* ascii
* base64
* ucs2
* ucs-2
* utf16le
* utf-16le
* binary

If an unknown type is passed-in, the `fallback` is used if given, else `binary`.
If you want to use a custom codec you can pass in an object containing a an `encode` and `decode` method and that will be returned.
If you pass a [compact encoder](https://github.com/compact-encoding/compact-encoding), then it will be converted into a codec for you and returned.

#### `const buf = codec.encode(value)`

Encode a value to a buffer.

#### `const value = codec.decode(buf)`

Decode a buffer to a value.

## License

MIT
