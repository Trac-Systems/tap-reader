import { Buff, Bytes } from '@cmdcode/buff-utils'

export type SignOptions = Partial<SignConfig>
export type CodeOptions = Partial<CodeConfig>

export interface SignConfig {
  aux       : Bytes
  adaptor  ?: Bytes
  nonce    ?: Bytes
  recovery ?: Bytes
  tweak    ?: Bytes
  throws    : boolean
  xonly     : boolean
}

export interface CodeConfig {
  aux    ?: Bytes
  even_y  : boolean
  tag     : string
  xonly   : boolean
}

const SIGN_DEFAULTS : SignConfig = {
  aux    : Buff.random(32),
  throws : false,
  xonly  : true
}

const CODE_DEFAULTS : CodeConfig = {
  xonly  : false,
  even_y : false,
  tag    : 'ecdh/shared'
}

export function sign_config (
  config : SignOptions = {}
) : SignConfig {
  return { ...SIGN_DEFAULTS, ...config  }
}

export function code_config (
  config : CodeOptions = {}
) : CodeConfig {
  return { ...CODE_DEFAULTS, ...config  }
}
