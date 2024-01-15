import { Bytes, ScriptData, ScriptPubKeyData, TxData, WitnessData } from '../../schema/types.js';
interface TxSizeData {
    size: number;
    bsize: number;
    vsize: number;
    weight: number;
}
export declare function readWitness(data?: ScriptData[]): WitnessData;
export declare function readScriptPubKey(script: ScriptData): ScriptPubKeyData;
export declare function getTxid(txdata: TxData | Bytes): string;
export declare function getTxSize(txdata: TxData | Bytes): TxSizeData;
export {};
//# sourceMappingURL=parse.d.ts.map