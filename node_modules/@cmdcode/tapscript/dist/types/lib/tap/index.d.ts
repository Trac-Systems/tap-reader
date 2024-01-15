import * as SCR from './tree.js';
import * as TWK from './tweak.js';
import * as CHK from './key.js';
export declare const TapTree: {
    getTag: typeof SCR.getTapTag;
    getLeaf: typeof SCR.getTapLeaf;
    getBranch: typeof SCR.getTapBranch;
    getRoot: typeof SCR.getTapRoot;
};
export declare const TapUtil: {
    readCtrlBlock: typeof CHK.readCtrlBlock;
    readParityBit: typeof CHK.readParityBit;
};
export declare const TapTweak: {
    getPubKey: typeof TWK.getTweakedPub;
    getSecKey: typeof TWK.getTweakedSec;
    getTweak: typeof TWK.getTapTweak;
    tweakSecKey: typeof TWK.tweakSecKey;
    tweakPubKey: typeof TWK.tweakPubKey;
};
export declare const Tap: {
    getPubKey: typeof CHK.getTapPubKey;
    getSecKey: typeof CHK.getTapSecKey;
    encodeScript: typeof SCR.getTapScript;
    checkPath: typeof CHK.checkPath;
    tree: {
        getTag: typeof SCR.getTapTag;
        getLeaf: typeof SCR.getTapLeaf;
        getBranch: typeof SCR.getTapBranch;
        getRoot: typeof SCR.getTapRoot;
    };
    tweak: {
        getPubKey: typeof TWK.getTweakedPub;
        getSecKey: typeof TWK.getTweakedSec;
        getTweak: typeof TWK.getTapTweak;
        tweakSecKey: typeof TWK.tweakSecKey;
        tweakPubKey: typeof TWK.tweakPubKey;
    };
    util: {
        readCtrlBlock: typeof CHK.readCtrlBlock;
        readParityBit: typeof CHK.readParityBit;
    };
    SCRIPT_PUBKEY: import("@cmdcode/buff-utils").Buff;
};
//# sourceMappingURL=index.d.ts.map