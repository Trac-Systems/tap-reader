import { Buff } from '@cmdcode/buff-utils';
import { Bytes, TxData, TxTemplate } from '../../schema/types.js';
export declare function toJson(txdata?: Bytes | TxData | TxTemplate): TxData;
export declare function toBytes(txdata?: Bytes | TxData | TxTemplate): Buff;
export declare const TxFmt: {
    toBytes: typeof toBytes;
    toJson: typeof toJson;
};
//# sourceMappingURL=format.d.ts.map