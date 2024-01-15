import { CtrlBlock, TapConfig, TapKey } from './types.js';
import { Bytes } from '../../schema/types.js';
export declare function getTapSecKey(seckey: Bytes, config?: TapConfig): TapKey;
export declare function getTapPubKey(pubkey: Bytes, config?: TapConfig): TapKey;
export declare function checkPath(tapkey: Bytes, target: Bytes, cblock: Bytes, config?: TapConfig): boolean;
export declare function readCtrlBlock(cblock: Bytes): CtrlBlock;
export declare function readParityBit(parity?: number | string): number;
//# sourceMappingURL=key.d.ts.map