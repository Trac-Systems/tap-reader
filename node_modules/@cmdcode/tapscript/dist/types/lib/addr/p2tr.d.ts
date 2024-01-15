import { Buff } from '@cmdcode/buff-utils';
import { Bytes, Networks } from '../../schema/types.js';
export declare function check(address: string): boolean;
export declare function encode(input: Bytes, network?: Networks): string;
export declare function decode(address: string): Buff;
export declare function scriptPubKey(input: Bytes): string[];
export declare function fromPubKey(pubkey: Bytes, network?: Networks): string;
export declare const P2TR: {
    check: typeof check;
    encode: typeof encode;
    decode: typeof decode;
    scriptPubKey: typeof scriptPubKey;
    fromPubKey: typeof fromPubKey;
};
//# sourceMappingURL=p2tr.d.ts.map