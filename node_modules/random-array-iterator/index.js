module.exports = class RandomArrayIterator {
  constructor (values) {
    this.values = values
    this.start = 0
    this.length = this.values.length
  }

  next () {
    if (this.length === 0) {
      if (this.start === 0) return { done: true, value: undefined }
      this.length = this.start
      this.start = 0
    }

    const i = this.start + ((Math.random() * this.length) | 0)
    const j = this.start + --this.length
    const value = this.values[i]

    this.values[i] = this.values[j]
    this.values[j] = value

    return { done: false, value }
  }

  dequeue () {
    this.values[this.start + this.length] = this.values[this.values.length - 1]
    this.values.pop()
  }

  requeue () {
    const i = this.start + this.length
    const value = this.values[i]
    this.values[i] = this.values[this.start]
    this.values[this.start++] = value
  }

  restart () {
    this.start = 0
    this.length = this.values.length
    return this
  }

  [Symbol.iterator] () {
    return this
  }
}
