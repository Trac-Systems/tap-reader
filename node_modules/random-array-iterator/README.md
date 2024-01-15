# random-array-iterator

An iterator to iterate an array in random order with controls to requeue or dequeue
elements during the iteration.

```
npm install random-array-iterator
```

## Usage

``` js
const RandomArrayIterator = require('random-array-iterator')

const ite = new RandomArrayIterator([1, 2, 3, 4, 5])

for (const val of ite) {
  console.log(val) // random value

  // call requeue if you want to revisit this value is the same iteration
  if (someCondition) ite.requeue()

  // call dequeue if you want to remove the value from the iteration and array entirely
  if (someOtherCondition) ite.dequeue()
}
```

## API

#### `ite = new RandomArrayIterator(array)`

Make a new iterator. Implements the JavaScript iterator interface.

#### `ite.requeue()`

Requeue the current value. Only valid to call during an iteration.

#### `ite.dequeue()`

Remove the current value from the array and iteration. Only valid to vall during an iteration.

#### `ite.restart()`

Restarts the iterator.

## License

MIT
