import { encodeTx } from './encode.js';
import { decodeTx } from './decode.js';
import { createTx } from './create.js';
import { getTxid, getTxSize, readScriptPubKey, readWitness } from './parse.js';
export declare const Tx: {
    create: typeof createTx;
    encode: typeof encodeTx;
    decode: typeof decodeTx;
    fmt: {
        toBytes: typeof import("./format.js").toBytes;
        toJson: typeof import("./format.js").toJson;
    };
    util: {
        getTxSize: typeof getTxSize;
        getTxid: typeof getTxid;
        readScriptPubKey: typeof readScriptPubKey;
        readWitness: typeof readWitness;
    };
};
//# sourceMappingURL=index.d.ts.map