import { Buff, Bytes } from '@cmdcode/buff-utils';
import { HashConfig } from '../types.js';
import { TxTemplate } from '../../../schema/types.js';
export declare function signTx(seckey: string | Uint8Array, txdata: TxTemplate | string | Uint8Array, index: number, config?: HashConfig): Buff;
export declare function sign(secret: Bytes, message: Bytes, rand?: Bytes): Buff;
export declare function verify(signature: Bytes, message: Bytes, pubkey: Bytes, shouldThrow?: boolean): boolean;
//# sourceMappingURL=sign.d.ts.map