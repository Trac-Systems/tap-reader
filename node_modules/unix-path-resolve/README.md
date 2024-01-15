# unix-path-resolve

Cross platform resolve that always returns a UNIX style `/` seperated path

```
npm install unix-path-resolve
```

Mostly useful for resolving modules cross platform

## Usage

``` js
const resolve = require('unix-path-resolve')

resolve('/foo/bar', '../baz') // /foo/baz
resolve('/foo/bar', '/baz/foo') // /baz/foo
resolve('/a/b/c', '../../../../d') // throws since its out of bounds
resolve('a', 'b') // throws since none of them are absolute
resolve('/a/b/c', '..\\d') // /a/b/d
resolve('/a/b/c', 'c:\\foo\\bar') // /foo/bar
resolve('file:///a/b', './c') // /a/b/c
```

## License

MIT
