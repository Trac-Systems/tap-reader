import { Buff, Bytes } from '@cmdcode/buff-utils'
import { Field }       from './ecc.js'
import { random }      from './utils.js'

export function is_even_pub (pubkey : Bytes) : boolean {
  const pub = Buff.bytes(pubkey)
  switch (true) {
    case (pub.length === 32):
      return true
    case (pub.length === 33 && pub[0] === 0x02):
      return true
    case (pub.length === 33 && pub[0] === 0x03):
      return false
    default:
      throw new TypeError(`Invalid public key: ${pub.hex}`)
  }
}

export function gen_seckey (
  even_y ?: boolean
) : Buff {
  return get_seckey(random(32), even_y)
}

export function get_seckey (
  secret : Bytes,
  even_y = false
) : Buff {
  const sec = Field.mod(secret)
  return (even_y) ? sec.negated.buff : sec.buff
}

export function get_pubkey (
  seckey : Bytes,
  xonly  = false
) : Buff {
  const p = Field.mod(seckey).point
  return (xonly) ? p.x : p.buff
}

export function get_keypair (
  secret  : Bytes,
  xonly  ?: boolean,
  even_y ?: boolean
) : [ Buff, Buff ] {
  const sec = get_seckey(secret, even_y)
  const pub = get_pubkey(sec, xonly)
  return [ sec, pub ]
}

export function gen_keypair (
  xonly  ?: boolean,
  even_y ?: boolean
) : [ Buff, Buff ] {
  const sec = random(32)
  return get_keypair(sec, xonly, even_y)
}
