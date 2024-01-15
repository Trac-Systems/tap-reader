# debounceify

Tiny async debouncer

```
npm install debounceify
```

## Usage

``` js
const debounceify = require('debounceify')

const debounced = debounceify(async function () {
  console.log('Running...')
  await new Promise(resolve => setTimeout(1000, resolve))
})

const a = debounced() // triggers the about function
const b = debounced()
const c = debounced()
const d = debounced() // these last 3 wait for the first one to finish
                      // then trigger one more.

await a
await b
await c
await d
```

## API

#### `fn = debounceify(asyncFunction)`

Debounces the `asyncFunction` so that

1. No parallel executions of `asyncFunction` will happen
2. Debounces the stack, so if 10 calls happen while `asyncFunction` is running only one more will be triggered when it finishes.
3. Forwards errors and return values.

## License

MIT
