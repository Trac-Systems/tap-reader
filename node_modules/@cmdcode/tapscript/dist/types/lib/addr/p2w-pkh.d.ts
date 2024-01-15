import { Buff } from '@cmdcode/buff-utils';
import { Bytes, Networks } from '../../schema/types.js';
import { hash160pkh } from './hash.js';
export declare function check(address: string): boolean;
export declare function encode(input: Bytes, network?: Networks): string;
export declare function decode(address: string): Buff;
export declare function scriptPubKey(input: Bytes): string[];
export declare function fromPubKey(pubkey: Bytes, network?: Networks): string;
export declare const P2WPKH: {
    check: typeof check;
    encode: typeof encode;
    decode: typeof decode;
    hash: typeof hash160pkh;
    scriptPubKey: typeof scriptPubKey;
    fromPubKey: typeof fromPubKey;
};
//# sourceMappingURL=p2w-pkh.d.ts.map