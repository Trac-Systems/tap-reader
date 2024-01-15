import { Buff } from '@cmdcode/buff-utils';
import { TxTemplate } from '../../../schema/types.js';
import { HashConfig } from '../types.js';
export declare function signTx(seckey: string | Uint8Array, txdata: TxTemplate | string | Uint8Array, index: number, config?: HashConfig): Buff;
//# sourceMappingURL=sign.d.ts.map