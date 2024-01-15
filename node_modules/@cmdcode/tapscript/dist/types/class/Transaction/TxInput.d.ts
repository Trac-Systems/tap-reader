import TxScript from './TxScript.js';
import TxSequence from './TxSequence.js';
import TxOutput from './TxOutput.js';
import TxWitness from './TxWitness.js';
import { HashConfig } from '../../lib/sig/types.js';
import { Bytes, InputData, InputType, TxData } from '../../schema/types.js';
export default class TxInput {
    readonly _tx: TxData;
    readonly idx: number;
    constructor(txdata: TxData, index: number);
    get data(): InputData;
    get txid(): string;
    get vout(): number;
    get prevout(): TxOutput | undefined;
    get scriptSig(): TxScript;
    get sequence(): TxSequence;
    get witness(): TxWitness;
    get type(): InputType;
    sign(seckey: Bytes, config: HashConfig): import("@cmdcode/buff-utils").Buff;
}
//# sourceMappingURL=TxInput.d.ts.map