import { Buff } from '@cmdcode/buff-utils';
import { hash160sh } from './hash.js';
import { Bytes, Networks, ScriptData } from '../../schema/types.js';
export declare function check(address: string, network?: Networks): boolean;
export declare function encode(input: Bytes, network?: Networks): string;
export declare function decode(address: string, network?: Networks): Buff;
export declare function scriptPubKey(input: Bytes): string[];
export declare function fromScript(script: ScriptData, network?: Networks): string;
export declare const P2SH: {
    check: typeof check;
    encode: typeof encode;
    decode: typeof decode;
    hash: typeof hash160sh;
    scriptPubKey: typeof scriptPubKey;
    fromScript: typeof fromScript;
};
//# sourceMappingURL=p2sh.d.ts.map