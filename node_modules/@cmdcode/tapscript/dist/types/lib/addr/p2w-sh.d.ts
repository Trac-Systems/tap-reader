import { Buff } from '@cmdcode/buff-utils';
import { sha256sh } from './hash.js';
import { Bytes, Networks, ScriptData } from '../../schema/types.js';
export declare function check(address: string): boolean;
export declare function encode(input: Bytes, network?: Networks): string;
export declare function decode(address: string): Buff;
export declare function scriptPubKey(input: Bytes): string[];
export declare function fromScript(script: ScriptData, network?: Networks): string;
export declare const P2WSH: {
    check: typeof check;
    encode: typeof encode;
    decode: typeof decode;
    hash: typeof sha256sh;
    scriptPubKey: typeof scriptPubKey;
    fromScript: typeof fromScript;
};
//# sourceMappingURL=p2w-sh.d.ts.map