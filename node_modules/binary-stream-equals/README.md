# binary-stream-equals

Check if two binary streams have the same content

```
npm install binary-stream-equals
```

(Only works with [streamx](https://github.com/streamxorg/streamx) and the latest versions of Node's readable-stream)

## Usage

``` js
const streamEquals = require('binary-stream-equals')

// Note that streamEquals consumes and destroys the streams when done
const eq = await streamEquals(binaryStreamA, binaryStreamB)
```

## License

MIT
