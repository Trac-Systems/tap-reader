import { Buff } from '@cmdcode/buff-utils';
import { ScriptData } from '../../schema/types.js';
type ScriptFormat = 'p2sh' | 'p2w' | 'p2tr';
export default class TxScript {
    readonly _buff: Buff;
    constructor(script: ScriptData);
    get raw(): Uint8Array;
    get hex(): string;
    get asm(): string[];
    getHash(format: ScriptFormat, version?: number): string;
    toJSON(): string[];
}
export {};
//# sourceMappingURL=TxScript.d.ts.map