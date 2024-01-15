const EventEmitter = require('events')

module.exports = class ReadyResource extends EventEmitter {
  constructor () {
    super()

    this.opening = null
    this.closing = null

    this.opened = false
    this.closed = false
  }

  ready () {
    if (this.opening) return this.opening
    this.opening = open(this)
    return this.opening
  }

  close () {
    if (this.closing) return this.closing
    this.closing = close(this)
    return this.closing
  }

  async _open () {
    // add impl here
  }

  async _close () {
    // add impl here
  }
}

async function open (self) {
  await self._open()
  self.opened = true
  self.emit('ready')
}

async function close (self) {
  if (self.opened === false && self.opening !== null) await self.opening
  await self._close()
  self.closed = true
  self.emit('close')
}
