export declare const Signer: {
    segwit: {
        hash: typeof import("./segwit/hash.js").hashTx;
        sign: typeof import("./segwit/sign.js").signTx;
        verify: typeof import("./segwit/verify.js").verifyTx;
    };
    taproot: {
        hash: typeof import("./taproot/hash.js").hashTx;
        sign: typeof import("./taproot/sign.js").signTx;
        verify: typeof import("./taproot/verify.js").verifyTx;
    };
};
//# sourceMappingURL=index.d.ts.map