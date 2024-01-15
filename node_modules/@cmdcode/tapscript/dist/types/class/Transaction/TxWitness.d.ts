import { Bytes, InputType, ScriptData, WitnessData } from '../../schema/types.js';
export default class TxWitness {
    readonly format?: InputType;
    readonly _data: ScriptData[];
    readonly _meta: WitnessData;
    constructor(data: ScriptData[], format?: InputType);
    get length(): number;
    get annex(): string | undefined;
    get cblock(): string | undefined;
    get script(): ScriptData | undefined;
    get params(): Bytes[];
    toJSON(): ScriptData[];
}
//# sourceMappingURL=TxWitness.d.ts.map