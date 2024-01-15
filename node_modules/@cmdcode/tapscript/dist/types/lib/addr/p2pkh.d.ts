import { Buff } from '@cmdcode/buff-utils';
import { Bytes, Networks } from '../../schema/types.js';
import { hash160pkh } from './hash.js';
export declare function check(address: string, network?: Networks): boolean;
export declare function encode(input: Bytes, network?: Networks): string;
export declare function decode(address: string, network?: Networks): Buff;
export declare function scriptPubKey(input: Bytes): string[];
export declare function fromPubKey(pubkey: Bytes, network?: Networks): string;
export declare const P2PKH: {
    check: typeof check;
    encode: typeof encode;
    decode: typeof decode;
    hash: typeof hash160pkh;
    scriptPubKey: typeof scriptPubKey;
    fromPubKey: typeof fromPubKey;
};
//# sourceMappingURL=p2pkh.d.ts.map