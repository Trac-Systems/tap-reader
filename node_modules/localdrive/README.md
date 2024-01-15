# localdrive

File system API that is similar to Hyperdrive

```
npm i localdrive
```

## Usage
```js
const Localdrive = require('localdrive')

const drive = new Localdrive('./my-project')

await drive.put('/blob.txt', Buffer.from('example'))
await drive.put('/images/logo.png', Buffer.from('..'))
await drive.put('/images/old-logo.png', Buffer.from('..'))

const buffer = await drive.get('/blob.txt')
console.log(buffer) // => <Buffer ..> "example"

const entry = await drive.entry('/blob.txt')
console.log(entry) // => { key, value: { executable, linkname, blob, metadata } }

await drive.del('/images/old-logo.png')

await drive.symlink('/images/logo.shortcut', '/images/logo.png')

for await (const file of drive.list('/images')) {
  console.log('list', file) // => { key, value }
}

const rs = drive.createReadStream('/blob.txt')
for await (const chunk of rs) {
  console.log('rs', chunk) // => <Buffer ..>
}

const ws = drive.createWriteStream('/blob.txt')
ws.write('new example')
ws.end()
ws.once('close', () => console.log('file saved'))
```

## API

#### `const drive = new Localdrive(root, [options])`

Creates a drive based on a `root` directory. `root` can be relative or absolute.

Available `options`:
```js
{
  followLinks: false,
  metadata: {
    get (key) {},
    put (key) {},
    del (key) {}
  }
}
```

`followLinks` does `entry(key)` to follow the `linkname`.

`metadata` hook functions are called accordingly. `del()` could be called with non-existing metadata keys.

#### `drive.root`

String with the resolved (absolute) drive path.

#### `drive.supportsMetadata`

Boolean that indicates if the drive handles or not metadata. Default `false`.

If you pass `opts.metadata` hooks then `supportsMetadata` becomes true.

#### `await drive.put(key, buffer, [options])`

Creates a file at `key` path in the drive. `options` are the same as in `createWriteStream`.

#### `const buffer = await drive.get(key)`

Returns the blob at `key` path in the drive. If no blob exists, returns null.

It also returns null for symbolic links.

#### `const entry = await drive.entry(key)`

Returns the entry at `key` path in the drive. It looks like this:
```js
{
  key: String,
  value: {
    executable: Boolean,
    linkname: null,
    blob: {
      blockOffset: Number,
      blockLength: Number,
      byteOffset: Number,
      byteLength: Number
    },
    metadata: null
  },
  mtime: Number
}
```

#### `await drive.del(key)`

Deletes the file at `key` path from the drive.

#### `await drive.symlink(key, linkname)`

Creates an entry in drive at `key` path that points to the entry at `linkname`.

If a blob entry currently exists at `key` path then it will get overwritten and `drive.get(key)` will return null, while `drive.entry(key)` will return the entry with symlink information.

#### `const comparison = drive.compare(entryA, entryB)`

Returns `0` if entries are the same, `1` if `entryA` is older, and `-1` if `entryB` is older.

#### `const iterator = drive.list([folder])`

Returns a stream of all entries in the drive inside of specified `folder`.

#### `const iterator = drive.readdir([folder])`

Returns a stream of all subpaths of entries in drive stored at paths prefixed by `folder`.

#### `const mirror = drive.mirror(out, [options])`

Efficiently mirror this drive into another. Returns a [`MirrorDrive`](https://github.com/holepunchto/mirror-drive#api) instance constructed with `options`.

Call `await mirror.done()` to wait for the mirroring to finish.

#### `const rs = drive.createReadStream(key, [options])`

Returns a stream to read out the blob stored in the drive at `key` path.

Available `options`:
```js
{
  start: Number,
  end: Number,
  length: Number
}
```

`start` and `end` are inclusive.\
`length` overrides `end`, they're not meant to be used together.

#### `const ws = drive.createWriteStream(key, [options])`

Stream a blob into the drive at `key` path.

Available `options`:
```js
{
  executable: Boolean
}
```

## Examples

### Metadata hooks
Metadata backed by `Map`:
```js
const meta = new Map()
const metadata = {
  get: (key) => meta.has(key) ? meta.get(key) : null,
  put: (key, value) => meta.set(key, value),
  del: (key) => meta.delete(key)
}

const drive = new Localdrive('./my-app', { metadata })

// ...
```

Note: `metadata.del()` will also be called when metadata is `null`:
```js
await drive.put('/file.txt', Buffer.from('a')) // Default metadata is null
```

## License
Apache-2.0
