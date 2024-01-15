import { Buff, Bytes }  from '@cmdcode/buff-utils'
import { Field, Point } from './ecc.js'

import {
  get_seckey,
  get_pubkey
}  from './keys.js'

import {
  taghash,
  hmac512
} from './hash.js'

import {
  CodeOptions,
  code_config
} from './config.js'

export function get_shared_key (
  self_sec : Bytes,
  peer_pub : Bytes
) : Buff {
  const P  = Point.from_x(peer_pub)
  const sp = Field.mod(self_sec)
  const sh = P.mul(sp)
  return sh.buff
}

export function get_shared_code (
  self_sec  : Bytes,
  peer_pub  : Bytes,
  options  ?: CodeOptions
) : Buff {
  const opt  = code_config(options)
  const sec  = get_seckey(self_sec, opt.even_y)
  const pub  = get_pubkey(sec, opt.xonly)
  const hash = taghash(opt.tag)
  const peer = Buff.bytes(peer_pub)
  // Derive a linked key (from the cold storage key).
  const link = get_shared_key(sec, peer)
  // Sort the keys lexographically.
  const keys = [ pub.hex, peer.hex ]
  keys.sort()
  if (opt.aux !== undefined) {
    const aux = Buff.bytes(opt.aux)
    keys.push(aux.hex)
  }
  // Use the linked key to produce a 512-bit HMAC code.
  return hmac512(link, Buff.join([ hash, ...keys ]))
}
