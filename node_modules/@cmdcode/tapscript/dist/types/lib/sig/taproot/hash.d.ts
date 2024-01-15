import { Buff } from '@cmdcode/buff-utils';
import { HashConfig } from '../types.js';
import { Bytes, InputData, OutputData, TxTemplate } from '../../../schema/types.js';
export declare function hashTx(template: TxTemplate | Bytes, index: number, config?: HashConfig): Buff;
export declare function hashOutpoints(vin: InputData[]): Uint8Array;
export declare function hashSequence(vin: InputData[]): Uint8Array;
export declare function hashAmounts(prevouts: OutputData[]): Uint8Array;
export declare function hashScripts(prevouts: OutputData[]): Uint8Array;
export declare function hashOutputs(vout: OutputData[]): Uint8Array;
export declare function hashOutput(vout: OutputData): Uint8Array;
//# sourceMappingURL=hash.d.ts.map