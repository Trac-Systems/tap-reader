class WriteLock {
  constructor (parent) {
    this.writing = false

    this._waiting = []
    this._parent = parent
    this._wait = pushToQueue.bind(this, this._waiting)
  }

  get locked () {
    return this.writing || this._parent.read.readers > 0
  }

  get waiting () {
    return this._waiting.length
  }

  lock () {
    if (this._parent._destroying) {
      return Promise.reject(this._parent._destroyError)
    }

    if (this.writing === false && this._parent.read.readers === 0) {
      this.writing = true
      return Promise.resolve()
    }

    return new Promise(this._wait)
  }

  unlock () {
    this.writing = false
    this._parent._bump()
  }

  async flush () {
    if (this.writing === false) return
    try {
      await this.lock()
    } catch {
      return
    }
    this.unlock()
  }
}

class ReadLock {
  constructor (parent) {
    this.readers = 0

    this._waiting = []
    this._parent = parent
    this._wait = pushToQueue.bind(this, this._waiting)
  }

  get locked () {
    return this._parent.writing
  }

  get waiting () {
    return this._waiting.length
  }

  lock () {
    if (this._parent._destroying) {
      return Promise.reject(this._parent._destroyError)
    }

    if (this._parent.write.writing === false) {
      this.readers++
      return Promise.resolve()
    }

    return new Promise(this._wait)
  }

  unlock () {
    this.readers--
    this._parent._bump()
  }

  async flush () {
    if (this.writing === false) return
    try {
      await this.lock()
    } catch {
      return
    }
    this.unlock()
  }
}

module.exports = class ReadWriteLock {
  constructor () {
    this.read = new ReadLock(this)
    this.write = new WriteLock(this)

    this._destroyError = null
    this._destroying = null
  }

  get destroyed () {
    return !!this._destroying
  }

  destroy (err) {
    if (this._destroying) return this._destroying

    this._destroying = Promise.all([this.read.flush(), this.write.flush()])
    this._destroyError = err || new Error('Mutex has been destroyed')

    if (err) {
      while (this.read._waiting) this._waiting.shift()[1](err)
      while (this.write._waiting) this._waiting.shift()[1](err)
    }

    return this._destroying
  }

  _bump () {
    if (this.write.writing === false && this.read.readers === 0 && this.write._waiting.length > 0) {
      this.write.writing = true
      this.write._waiting.shift()[0]()
    }
    while (this.write.writing === false && this.read._waiting.length > 0) {
      this.read.readers++
      this.read._waiting.shift()[0]()
    }
  }
}

function pushToQueue (queue, resolve, reject) {
  queue.push([resolve, reject])
}
