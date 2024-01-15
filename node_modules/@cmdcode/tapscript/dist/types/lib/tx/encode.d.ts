import { Buff } from '@cmdcode/buff-utils';
import { SequenceData, TxTemplate, LockData, ValueData, TxData } from '../../schema/types.js';
export declare function encodeTx(txdata: TxTemplate | TxData, omitWitness?: boolean): Buff;
export declare function encodeVersion(num: number): Uint8Array;
export declare function encodeTxid(txid: string): Uint8Array;
export declare function encodePrevOut(vout: number): Uint8Array;
export declare function encodeSequence(sequence: SequenceData): Uint8Array;
export declare function encodeValue(value: ValueData): Uint8Array;
export declare function encodeLocktime(locktime: LockData): Uint8Array;
//# sourceMappingURL=encode.d.ts.map