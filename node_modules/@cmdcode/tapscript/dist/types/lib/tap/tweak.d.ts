import { Buff } from '@cmdcode/buff-utils';
import { Bytes } from '../../schema/types.js';
export declare function getTapTweak(key: Bytes, data?: Bytes, isPrivate?: boolean): Buff;
export declare function getTweakedKey(intkey: Bytes, data?: Bytes, isPrivate?: boolean): Buff;
export declare function getTweakedPub(pubkey: Bytes, data?: Bytes): Buff;
export declare function getTweakedSec(seckey: Bytes, data?: Bytes): Buff;
export declare function tweakSecKey(seckey: Bytes, tweak: Bytes): Buff;
export declare function tweakPubKey(pubkey: Bytes, tweak: Bytes): Buff;
export declare const SCRIPT_PUBKEY: Buff;
//# sourceMappingURL=tweak.d.ts.map