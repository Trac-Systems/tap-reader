import { Buff, Bytes }     from '@cmdcode/buff-utils'
import { secp256k1 }       from '@noble/curves/secp256k1'
import { Field, mod, pow } from '@noble/curves/abstract/modular'
import { PointData }       from './types.js'

export {
  mod,
  pow,
  pow2,
  invert
} from '@noble/curves/abstract/modular'

export const curve = secp256k1.CURVE

const N = curve.n
const P = curve.p

const G : PointData = { x: curve.Gx, y: curve.Gy }

const _0n = BigInt(0)
const _1n = BigInt(1)
const _2n = BigInt(2)
const _3n = BigInt(3)
const _4n = BigInt(4)

export const CONST = { N, P, G, _0n, _1n, _2n, _3n, _4n }

export const ecc   = Field(N, 32, true)

export const modN = (x : bigint) : bigint => mod(x, N)
export const modP = (x : bigint) : bigint => mod(x, P)
export const powN = (x : bigint, exp : bigint) : bigint => pow(x, exp, N)

export const on_curve = (x : bigint) : boolean => {
  return typeof x === 'bigint' && _0n < x && x < P
}
export const in_field = (x : bigint) : boolean => {
  return typeof x === 'bigint' && _0n < x && x < N
}

export function mod_bytes (bytes : Bytes) : Buff {
  const b = Buff.bytes(bytes).big
  return Buff.big(modN(b), 32)
}
