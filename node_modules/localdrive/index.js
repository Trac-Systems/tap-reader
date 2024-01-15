const fs = require('fs')
const fsp = require('fs/promises')
const path = require('path')
const b4a = require('b4a')
const unixPathResolve = require('unix-path-resolve')
const { FileReadStream, FileWriteStream } = require('./streams.js')
const mutexify = require('mutexify/promise')
const MirrorDrive = require('mirror-drive')

module.exports = class Localdrive {
  constructor (root, opts = {}) {
    this.root = path.resolve(root)
    this.metadata = handleMetadataHooks(opts.metadata) || {}
    this.supportsMetadata = !!opts.metadata

    this._stat = opts.followLinks ? stat : lstat
    this._lock = mutexify()
  }

  async ready () { /* No-op, compatibility */ }
  async close () { /* No-op, compatibility */ }
  async flush () { /* No-op, compatibility */ }

  batch () {
    return this
  }

  checkout () {
    return this
  }

  toKey (filename) {
    if (filename.startsWith(this.root)) filename = filename.slice(this.root.length)
    return unixPathResolve('/', filename)
  }

  toPath (key) {
    return keyResolve(this.root, key).filename
  }

  async entry (key) {
    if (typeof key === 'object') key = key.key

    const { keyname, filename } = keyResolve(this.root, key)

    const st = await this._stat(filename)
    if (!st || st.isDirectory()) {
      return null
    }

    const entry = {
      key: keyname,
      value: {
        executable: false,
        linkname: null,
        blob: null,
        metadata: null
      },
      mtime: st.mtimeMs
    }

    if (st.isSymbolicLink()) {
      let link = await fsp.readlink(filename)
      if (link.startsWith(this.root)) link = link.slice(this.root.length)
      entry.value.linkname = link.replace(/\\/g, '/')
      return entry
    }

    entry.value.executable = isExecutable(st.mode)
    if (this.metadata.get) entry.value.metadata = await this.metadata.get(keyname)

    if (st.isFile()) {
      const blockLength = st.blocks || Math.ceil(st.size / st.blksize) * 8
      entry.value.blob = { blockOffset: 0, blockLength, byteOffset: 0, byteLength: st.size }
      return entry
    }

    return null
  }

  async get (key) {
    const entry = await this.entry(key)
    if (!entry || !entry.value.blob) return null

    const rs = this.createReadStream(key)
    const chunks = []
    for await (const chunk of rs) {
      chunks.push(chunk)
    }
    return b4a.concat(chunks)
  }

  put (key, buffer, opts) {
    return new Promise((resolve, reject) => {
      const ws = this.createWriteStream(key, opts)
      let error = null
      ws.on('error', (err) => {
        error = err
      })
      ws.on('close', () => {
        if (error) reject(error)
        else resolve()
      })
      ws.end(buffer)
    })
  }

  async del (key) {
    const { keyname, filename } = keyResolve(this.root, key)

    try {
      await fsp.unlink(filename)
    } catch (error) {
      if (error.code === 'ENOENT') return
      throw error
    }

    const release = await this._lock()
    try {
      await gcEmptyFolders(this.root, path.dirname(filename))
    } finally {
      release()
    }

    if (this.metadata.del) await this.metadata.del(keyname)
  }

  async symlink (key, linkname) {
    const entry = await this.entry(key)
    if (entry) await this.del(key)

    const { filename: pointer } = keyResolve(this.root, key)

    const release = await this._lock()
    try {
      await fsp.mkdir(path.dirname(pointer), { recursive: true })

      const target = linkname.startsWith('/')
        ? keyResolve(this.root, linkname).filename
        : linkname.replace(/\//g, path.sep)

      await fsp.symlink(target, pointer)
    } finally {
      release()
    }
  }

  compare (a, b) {
    const diff = a.mtime - b.mtime
    return diff > 0 ? 1 : (diff < 0 ? -1 : 0)
  }

  async * list (folder) {
    const { keyname, filename: fulldir } = keyResolve(this.root, folder || '/')
    const iterator = await opendir(fulldir)

    if (!iterator) return

    for await (const dirent of iterator) {
      const key = unixPathResolve(keyname, dirent.name)

      if (dirent.isDirectory()) {
        yield * this.list(key)
        continue
      }

      const entry = await this.entry(key)
      if (entry) yield entry
    }
  }

  async * readdir (folder) {
    const { keyname, filename: fulldir } = keyResolve(this.root, folder || '/')
    const iterator = await readdir(fulldir)

    if (!iterator) return

    for await (const dirent of iterator) {
      const key = unixPathResolve(keyname, dirent.name)

      let suffix = key.slice(keyname.length)
      const i = suffix.indexOf('/')
      if (i > -1) suffix = suffix.slice(i + 1)

      if (dirent.isDirectory()) {
        if (!(await isEmptyDirectory(this, key))) {
          yield suffix
        }
        continue
      }

      const entry = await this.entry(key)
      if (entry) yield suffix
    }
  }

  mirror (out, opts) {
    return new MirrorDrive(this, out, opts)
  }

  createReadStream (key, opts) {
    if (typeof key === 'object') key = key.key

    const { filename } = keyResolve(this.root, key)
    return new FileReadStream(filename, opts)
  }

  createWriteStream (key, opts) {
    const { keyname, filename } = keyResolve(this.root, key)
    return new FileWriteStream(filename, keyname, this, opts)
  }
}

function handleMetadataHooks (metadata) {
  if (metadata instanceof Map) {
    return {
      get: (key) => metadata.has(key) ? metadata.get(key) : null,
      put: (key, value) => metadata.set(key, value),
      del: (key) => metadata.delete(key)
    }
  }

  return metadata
}

function keyResolve (root, key) {
  const keyname = unixPathResolve('/', key)
  const filename = path.join(root, keyname)
  return { keyname, filename }
}

function isExecutable (mode) {
  return !!(mode & fs.constants.S_IXUSR)
}

async function lstat (filename) {
  try {
    return await fsp.lstat(filename)
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

async function stat (filename) {
  try {
    return await fsp.stat(filename)
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

async function opendir (dir) {
  try {
    return await fsp.opendir(dir)
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

async function readdir (dir) {
  try {
    return await fsp.readdir(dir, { withFileTypes: true })
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
}

async function gcEmptyFolders (root, dir) {
  try {
    while (dir !== root) {
      await fsp.rmdir(dir)
      dir = path.dirname(dir)
    }
  } catch {
    // silent error
  }
}

async function isEmptyDirectory (drive, key) {
  for await (const entry of drive.list(key)) { // eslint-disable-line
    return false
  }
  return true
}
