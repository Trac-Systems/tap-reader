import { decodeAddress, fromScriptPubKey, toScriptPubKey } from './utils.js';
export declare const Address: {
    p2pkh: {
        check: typeof import("./p2pkh.js").check;
        encode: typeof import("./p2pkh.js").encode;
        decode: typeof import("./p2pkh.js").decode;
        hash: typeof import("./hash.js").hash160pkh;
        scriptPubKey: typeof import("./p2pkh.js").scriptPubKey;
        fromPubKey: typeof import("./p2pkh.js").fromPubKey;
    };
    p2sh: {
        check: typeof import("./p2sh.js").check;
        encode: typeof import("./p2sh.js").encode;
        decode: typeof import("./p2sh.js").decode;
        hash: typeof import("./hash.js").hash160sh;
        scriptPubKey: typeof import("./p2sh.js").scriptPubKey;
        fromScript: typeof import("./p2sh.js").fromScript;
    };
    p2wpkh: {
        check: typeof import("./p2w-pkh.js").check;
        encode: typeof import("./p2w-pkh.js").encode;
        decode: typeof import("./p2w-pkh.js").decode;
        hash: typeof import("./hash.js").hash160pkh;
        scriptPubKey: typeof import("./p2w-pkh.js").scriptPubKey;
        fromPubKey: typeof import("./p2w-pkh.js").fromPubKey;
    };
    p2wsh: {
        check: typeof import("./p2w-sh.js").check;
        encode: typeof import("./p2w-sh.js").encode;
        decode: typeof import("./p2w-sh.js").decode;
        hash: typeof import("./hash.js").sha256sh;
        scriptPubKey: typeof import("./p2w-sh.js").scriptPubKey;
        fromScript: typeof import("./p2w-sh.js").fromScript;
    };
    p2tr: {
        check: typeof import("./p2tr.js").check;
        encode: typeof import("./p2tr.js").encode;
        decode: typeof import("./p2tr.js").decode;
        scriptPubKey: typeof import("./p2tr.js").scriptPubKey;
        fromPubKey: typeof import("./p2tr.js").fromPubKey;
    };
    decode: typeof decodeAddress;
    fromScriptPubKey: typeof fromScriptPubKey;
    toScriptPubKey: typeof toScriptPubKey;
};
//# sourceMappingURL=index.d.ts.map