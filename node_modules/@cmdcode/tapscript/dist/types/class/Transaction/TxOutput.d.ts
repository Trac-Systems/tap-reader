import TxScript from './TxScript.js';
import { OutputData, OutputType } from '../../schema/types.js';
export default class TxOutput {
    value: bigint;
    scriptPubKey: TxScript;
    constructor(txout: OutputData);
    get type(): OutputType;
}
//# sourceMappingURL=TxOutput.d.ts.map