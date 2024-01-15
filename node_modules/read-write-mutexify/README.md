# read-write-mutexify

Like [mutexify](https://github.com/mafintosh/mutexify) but with read/write locks

```
npm install read-write-mutexify
```

## Usage

``` js
const RW = require('read-write-mutexify')

const rw = new RW()

// read locks waits for writer locks to be released
await rw.read.lock()
await rw.read.lock() // make as many as you want

// unlock with unlock
rw.read.unlock()
rw.read.unlock()

// only one writer can have the write lock and it waits
// for any read lock to be released

await rw.write.lock()

// unlock with unlock
rw.write.unlock()
```

## License

MIT
