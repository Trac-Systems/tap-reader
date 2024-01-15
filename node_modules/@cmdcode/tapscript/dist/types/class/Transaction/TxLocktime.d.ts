import { LockData } from '../../schema/types.js';
export default class TxLocktime {
    value: number;
    constructor(value?: LockData);
    get isTimelock(): boolean;
    get timestamp(): number;
    set timestamp(value: number);
    get blockheight(): number;
    set blockheight(value: number);
    get estDate(): Date;
    set estDate(date: Date);
    toJSON(): number;
}
//# sourceMappingURL=TxLocktime.d.ts.map