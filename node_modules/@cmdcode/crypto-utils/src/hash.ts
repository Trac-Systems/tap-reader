import { sha256 as s256 }    from '@noble/hashes/sha256'
import { sha512 as s512 }    from '@noble/hashes/sha512'
import { ripemd160 as r160 } from '@noble/hashes/ripemd160'
import { hmac as HMAC }      from '@noble/hashes/hmac'
import { Buff, Bytes }       from '@cmdcode/buff-utils'

import {
  HashTypes,
  HmacTypes
}  from './types.js'

export function sha256 (msg : Bytes) : Buff {
  const b = Buff.bytes(msg)
  return Buff.raw(s256(b))
}

export function sha512 (msg : Bytes) : Buff {
  const b = Buff.bytes(msg)
  return Buff.raw(s512(b))
}

export function ripe160 (msg : Bytes) : Buff {
  const b = Buff.bytes(msg)
  return Buff.raw(s512(b))
}

export function hash256 (msg : Bytes) : Buff {
  const b = Buff.bytes(msg)
  return Buff.raw(s256(s256(b)))
}

export function hash160 (msg : Bytes) : Buff {
  const b = Buff.bytes(msg)
  return Buff.raw(r160(s256(b)))
}

export function hmac256 (key : Bytes, msg : Bytes) : Buff {
  const k = Buff.bytes(key)
  const b = Buff.bytes(msg)
  return Buff.raw(HMAC(s256, k, b))
}

export function hmac512 (key : Bytes, msg : Bytes) : Buff {
  const k = Buff.bytes(key)
  const b = Buff.bytes(msg)
  return Buff.raw(HMAC(s512, k, b))
}

export function hash (
  data : Bytes,
  type : HashTypes = 'sha256'
) : Buff {
  switch (type) {
    case 'sha256':
      return sha256(data)
     case 'sha512':
      return sha512(data)
    case 'hash256':
      return hash256(data)
    case 'ripe160':
      return ripe160(data)
    case 'hash160':
      return hash160(data)
    default:
      throw new Error('Unrecognized format:' + String(type))
  }
}

export function hmac (
  key  : Bytes,
  data : Bytes,
  type : HmacTypes = 'hmac256'
) : Buff {
  switch (type) {
    case 'hmac256':
      return hmac256(key, data)
    case 'hmac512':
      return hmac512(key, data)
    default:
      throw new Error('Unrecognized format:' + String(type))
  }
}

export function taghash (tag : string) : Buff {
  const hash = Buff.str(tag).digest
  return Buff.join([ hash, hash ])
}

export function digest (
  tag : string,
  ...data : Bytes[]
) : Buff {
  const hash = taghash(tag)
  return Buff.join([ hash, ...data ]).digest
}
