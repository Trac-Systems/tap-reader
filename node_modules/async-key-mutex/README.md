[![Build Status](https://travis-ci.org/m-ramp/async-key-mutex.svg?branch=master)](https://travis-ci.org/m-ramp/async-key-mutex)
[![npm version](https://badge.fury.io/js/async-key-mutex.svg)](https://badge.fury.io/js/async-key-mutex)

# What is it?

This package implements a mutex based on keys for synchronizing asynchronous operations in
Javascript.
Based on the package https://www.npmjs.com/package/async-mutex but added key specific locking and written in js.

The term "mutex" usually refers to a data structure used to synchronize
concurrent processes running on different threads. For example, before accessing
a non-threadsafe resource, a thread will lock the mutex. This is guaranteed
to block the thread until no other thread holds a lock on the mutex and thus
enforces exclusive access to the resource. Once the operation is complete, the
thread releases the lock, allowing other threads to aquire a lock and access the
resource.

While Javascript is strictly single-threaded, the asynchronous nature of its
execution model allows for race conditions that require similar synchronization
primitives. Consider for example a library communicating with a web worker that
needs to exchange several subsequent messages with the worker in order to achieve
a task. As these messages are exchanged in an asynchronous manner, it is perfectly
possible that the library is called again during this process. Depending on the
way state is handled during the async process, this will lead to race conditions
that are hard to fix and even harder to track down.

This library solves the problem by applying the concept of mutexes to Javascript.
A mutex is locked by providing a worker callback that will be called once no other locks
are held on the mutex. Once the async process is complete (usually taking multiple
spins of the event loop), a callback supplied to the worker is called in order
to release the mutex, allowing the next scheduled worker to execute.

# How to use it?

## Installation

You can install the library into your project via npm

    npm install async-key-mutex

## Importing

ES5 / CommonJS

```javascript
var asyncMutex = require("async-key-mutex").Mutex;
```

ES6

```javascript
import {Mutex} from "async-key-mutex";
```

Be aware that `async-key-mutex` is a commonjs package, though, and that the named exports will not work with the ES module implementation in Node 13 yet.

## API

### Creating

ES5/ES6

```javascript
const mutex = new Mutex();
```

Create a new mutex.

### Locking

ES5/ES6

```javascript
mutex.acquire(key).then(function(release) {
    // ...
});
```

`acquire` returns an (ES6) promise that will resolve as soon as the mutex is
available and ready to be accessed. The promise resolves with a function `release` that
must be called once the mutex should be released again.

**IMPORTANT:** Failure to call `release` will hold the mutex locked and will
lilely deadlock the application. Make sure to call `release` under all circumstances
and handle exceptions accordingly.

##### Async function example (ESnext)

```javascript
const release = await mutex.acquire(key);
try {
    const i = await store.get();
    await store.put(i + 1);
} finally {
    release(key);
}
```

### Checking whether the mutex is locked

ES5/ES6

```javascript
mutex.isLocked(key);
```

# License

Feel free to use this library under the conditions of the MIT license.
