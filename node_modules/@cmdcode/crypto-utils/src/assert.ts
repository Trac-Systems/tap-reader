import { Buff, Bytes } from '@cmdcode/buff-utils'
import { CONST }       from './math.js'
import { is_valid }    from './point.js'
import { PointData }   from './types.js'

const { N, P, _0n } = CONST

export function fail (
  error  : string,
  throws = false
) : boolean {
  if (throws) {
    throw new Error(error)
  } else {
    return false
  }
}

export function size (
  input   : Bytes,
  size    : number,
  throws ?: boolean
) : boolean {
  const bytes = Buff.bytes(input)
  if (bytes.length !== size) {
    return fail(`Invalid byte size: ${bytes.hex} !== ${size}`, throws)
  }
  return true
}

export function min_value (
  bytes : Bytes,
  min   : bigint
) : void {
  const val = Buff.bytes(bytes).big
  if (val < min) {
    throw new TypeError(`Bytes integer value is too low: ${val} < ${min}`)
  }
}

export function exists <T> (
  input  ?: T
) : asserts input is T {
  if (typeof input === 'undefined') {
    throw new TypeError('Input is undefined!')
  }
}

export function on_curve (
  x       : bigint,
  throws ?: boolean
) : boolean {
  if (!(typeof x === 'bigint' && _0n < x && x < P)) {
    fail('x value is not on the curve!', throws)
  }
  return true
}

export function in_field (
  x       : bigint,
  throws ?: boolean
) : boolean {
  if (!(typeof x === 'bigint' && _0n < x && x < N)) {
    fail('x value is not in the field!', throws)
  }
  return true
}

export function valid_point (p : any) : asserts p is PointData {
  if (!is_valid(p)) {
    throw new TypeError('Point is invalid!')
  }
}

export function valid_chain (
  path  : string,
  code ?: Bytes
) : void {
  if (code === undefined) {
    if (!path.startsWith('m')) {
      throw new Error('You need to specify a chain-code for a non-root path.')
    }
  } else {
    if (Buff.bytes(code).length !== 32) {
      throw new Error('Chain code must be 32 bytes!')
    }
  }
}

export function valid_path (path : string) : void {
  const regex = /^(m)?(\/)?(\w+'?\/)*\w+'?$/
  if (path.match(regex) === null) {
    throw new Error('Provided path string is invalid: ' + path)
  }
}

export function valid_hash (hash : string) : void {
  const regex = /^[0-9a-fA-F]{64}$/
  if (hash.match(regex) === null) {
    throw new Error('Provided hash string is invalid: ' + hash)
  }
}

export function valid_index (index : number) : void {
  if (index > 0x80000000) {
    throw new TypeError('Index value must not exceed 31 bits.')
  }
}

export function valid_pubkey (pubkey : Bytes) : void {
  const key = Buff.bytes(pubkey)
  if (key.length !== 33) {
    throw new TypeError('Index value must not exceed 31 bits.')
  }
}

export function valid_derive_state (
  hardened   : boolean,
  is_private : boolean
) : void {
  if (hardened && !is_private) {
    throw new Error('Cannot derive hardedened paths when is_private is false!')
  }
}
