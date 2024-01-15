import { Buff } from '@cmdcode/buff-utils';
import TxInput from './TxInput.js';
import TxOutput from './TxOutput.js';
import TxLocktime from './TxLocktime.js';
import { TxData, TxTemplate } from '../../schema/types.js';
export default class Transaction {
    readonly _data: TxData;
    constructor(txdata: string | Uint8Array | TxTemplate);
    get data(): TxData;
    get version(): number;
    get vin(): TxInput[];
    get vout(): TxOutput[];
    get locktime(): TxLocktime;
    get base(): Buff;
    get buff(): Buff;
    get raw(): Uint8Array;
    get hex(): string;
    get size(): number;
    get bsize(): number;
    get weight(): number;
    get vsize(): number;
    get hash(): string;
    get txid(): string;
    export(): Promise<object>;
}
//# sourceMappingURL=Transaction.d.ts.map