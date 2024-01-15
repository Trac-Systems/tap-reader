import { Buff, Bytes }  from '@cmdcode/buff-utils'
import { hmac512 }      from './hash.js'
import { Field, Point } from './ecc.js'
import { HDKey }        from './types.js'
import * as assert      from './assert.js'
import * as ecc         from './keys.js'

type Tweak = [ tweak: Bytes, hardened: boolean ]

const INT_REGEX  = /^[0-9]{0,10}$/,
      STR_REGEX  = /^[0-9a-zA-Z_&?=]{64}$/

export function derive (
  key_path    : string,
  key_data    : Bytes,
  chain_code ?: Bytes,
  is_private  = false
) : HDKey {
  // Assert the key path is valid.
  assert.valid_path(key_path)
  // Check if this is the master path.
  const is_m = key_path.startsWith('m')
  // Assert no conflicts between path and chain.
  assert.valid_chain(key_path, chain_code)
  // Prepare the chain code.
  let code = (chain_code !== undefined)
    ? Buff.bytes(chain_code)
    : Buff.str('Bitcoin seed')

  // Prepare the key data.
  let key = Buff.bytes(key_data)

  if (is_m) {
    const root = generate_code(code, key)
    key  = Buff.raw(root[0])
    code = Buff.raw(root[1])
    is_private = true
  }

  // If private key:
  if (is_private) {
    // Assert key length is 32 bytes.
    assert.size(key, 32, true)
  } else {
    // Else, public key may be 32 or 33 bytes (thanks taproot).
    if (key.length === 33) {
      // Prefix 32 byte keys with an even parity.
      key = key.slice(1)
    }
    // Public key must be 33 bytes past this point.
    assert.size(key, 33)
  }

  // Derive paths for key tweaking.
  const paths = parse_path(key_path)

  // For each path segment:
  for (const path of paths) {
    // Extract the path data.
    const [ data, hardened ] = path
    // Assert valid key state.
    assert.valid_derive_state(hardened, is_private)
    // Format our bytes based on path state.
    const bytes = (hardened)
      ? Buff.join([ 0x00, key, data ])
      : Buff.join([ ecc.get_pubkey(key), data ])

    const [ tweak, next_code ] = generate_code(code, bytes)

    code = Buff.raw(next_code)

    if (is_private) {
      key = Field.mod(key).add(tweak).buff
      assert.in_field(key.big, true)
    } else {
      key = Point.from_x(key).add(tweak).buff
      assert.on_curve(key.slice(1).big)
    }
  }

  return [ key, code ]
}

function parse_path (
  fullpath : string
) : Tweak[] {
  const tweaks : Tweak[] = []

  let paths = fullpath.split('/')

  if (paths[0] === 'm' || paths[0] === '') {
    // Remove invalid characters.
    paths = paths.slice(1)
  }

  for (let path of paths) {
      let hardened = false

    if (path.slice(-1) === '\'') {
      hardened = true
      path = path.slice(0, -1)
    }

    if (path.match(INT_REGEX) !== null) {
      let index = parseInt(path, 10)
      assert.valid_index(index)
      if (hardened) index += 0x80000000
      tweaks.push([ Buff.num(index, 4), hardened ])
    } else if (path.match(STR_REGEX) !== null) {
      let index = Buff.str(path)
      if (hardened) index = index.prepend(0x80)
      tweaks.push([ index.digest, hardened ])
    } else {
      throw new Error('Invalid path segment:' + path)
    }
  }

  return tweaks
}

export function generate_code (
  chain : Uint8Array,
  data  : Uint8Array
) : Uint8Array[] {
  /* Perform a SHA-512 operation on the provided key,
   * then an HMAC signing operation using the chain code.
   */
  const I  = hmac512(chain, data),
        IL = I.slice(0, 32),
        IR = I.slice(32)
  // Return each half of the hashed result in an array.
  return [ IL, IR ]
}
