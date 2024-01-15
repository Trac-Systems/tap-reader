const FACTOR = new Uint16Array(8)

function factor4096 (i, n) {
  while (n > 0) {
    const f = i & 4095
    FACTOR[--n] = f
    i = (i - f) / 4096
  }
  return FACTOR
}

module.exports = class BigSparseArray {
  constructor () {
    this.tiny = new TinyArray()
    this.maxLength = 4096
    this.factor = 1
  }

  set (index, val) {
    if (val !== undefined) {
      while (index >= this.maxLength) {
        this.maxLength *= 4096
        this.factor++
        if (!this.tiny.isEmptyish()) {
          const t = new TinyArray()
          t.set(0, this.tiny)
          this.tiny = t
        }
      }
    }

    const f = factor4096(index, this.factor)
    const last = this.factor - 1

    let tiny = this.tiny
    for (let i = 0; i < last; i++) {
      const next = tiny.get(f[i])
      if (next === undefined) {
        if (val === undefined) return
        tiny = tiny.set(f[i], new TinyArray())
      } else {
        tiny = next
      }
    }

    return tiny.set(f[last], val)
  }

  get (index) {
    if (index >= this.maxLength) return

    const f = factor4096(index, this.factor)
    const last = this.factor - 1

    let tiny = this.tiny
    for (let i = 0; i < last; i++) {
      tiny = tiny.get(f[i])
      if (tiny === undefined) return
    }

    return tiny.get(f[last])
  }
}

class TinyArray {
  constructor () {
    this.s = 0
    this.b = new Array(1)
    this.f = new Uint16Array(1)
  }

  isEmptyish () {
    return this.b.length === 1 && this.b[0] === undefined
  }

  get (i) {
    if (this.s === 12) return this.b[i]
    const f = i >>> this.s
    const r = i & (this.b.length - 1)
    return this.f[r] === f ? this.b[r] : undefined
  }

  set (i, v) {
    while (this.s !== 12) {
      const f = i >>> this.s
      const r = i & (this.b.length - 1)
      const o = this.b[r]

      if (o === undefined || f === this.f[r]) {
        this.b[r] = v
        this.f[r] = f
        return v
      }

      this.grow()
    }

    this.b[i] = v
    return v
  }

  grow () {
    const os = this.s
    const ob = this.b
    const of = this.f

    this.s += 4
    this.b = new Array(this.b.length << 4)
    this.f = this.s === 12 ? null : new Uint8Array(this.b.length)

    const m = this.b.length - 1

    for (let or = 0; or < ob.length; or++) {
      if (ob[or] === undefined) continue

      const i = of[or] << os | or
      const f = i >>> this.s
      const r = i & m

      this.b[r] = ob[or]
      if (this.s !== 12) this.f[r] = f
    }
  }
}
