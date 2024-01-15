import { secp256k1 as secp, schnorr } from '@noble/curves/secp256k1'

import { derive }  from './derive.js'

import {
  parse_x,
  normalize_x
} from './utils.js'

import * as keys from './keys.js'
import * as sign from './sig.js'

export const noble = { secp, schnorr }

export * from './config.js'
export * from './ecc.js'
export * from './hash.js'
export * from './types.js'

export * as assert from './assert.js'
export * as ecdh   from './ecdh.js'
export * as math   from './math.js'
export * as point  from './point.js'
export * as util   from './utils.js'

export const ecc = {
  ...keys,
  ...sign,
  derive,
  parse_x,
  normalize_x
}
