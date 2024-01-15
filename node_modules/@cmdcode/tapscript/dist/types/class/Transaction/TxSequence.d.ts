import { SequenceData } from '../../schema/types.js';
export default class TxSequence {
    value: number;
    constructor(value: SequenceData);
    get isReplaceable(): boolean;
    get isLocked(): boolean;
    get isTimelock(): boolean;
    get timestamp(): number;
    set timestamp(value: number);
    get blockheight(): number;
    set blockheight(value: number);
    get estDate(): Date;
    set estDate(date: Date);
    toJSON(): number;
}
//# sourceMappingURL=TxSequence.d.ts.map