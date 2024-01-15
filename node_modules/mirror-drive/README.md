# mirror-drive

Mirror a Hyperdrive or Localdrive into another one

```
npm i mirror-drive
```

## Usage
```js
import MirrorDrive from 'mirror-drive'

const src = new Localdrive('./src')
const dst = new Hyperdrive(store)

const mirror = new MirrorDrive(src, dst)
console.log(mirror.count) // => { files: 0, add: 0, remove: 0, change: 0 }

for await (const diff of mirror) {
  console.log(diff) /* {
    op: 'add',
    key: '/new-file.txt',
    bytesRemoved: 0,
    bytesAdded: 4
  }*/
}

console.log(mirror.count) // => { files: 1, add: 1, remove: 0, change: 0 }
```

Another example:
```js
const mirror = new MirrorDrive(src, dst)

console.log(mirror.count) // => { files: 0, add: 0, remove: 0, change: 0 }
await mirror.done()
console.log(mirror.count) // => { files: 1, add: 1, remove: 0, change: 0 }
```

## API

#### `const mirror = new MirrorDrive(src, dst, [options])`

Creates a mirror instance to efficiently move `src` drive into `dst` drive.

Available `options`:
```js
{
  prefix: '/',
  dryRun: false,
  prune: true,
  includeEquals: false,
  filter: (key) => true,
  metadataEquals: (srcMetadata, dstMetadata) => { ... }
  batch: false,
  entries: null // Array of key entries (if you use this then prefix is ignored)
}
```

#### `mirror.count`

It counts the total files proccessed, added, removed, and changed.

Default value: `{ files: 0, add: 0, remove: 0, change: 0 }`

#### `await mirror.done()`

It starts processing all the diffing until is done.

## License

Apache-2.0
