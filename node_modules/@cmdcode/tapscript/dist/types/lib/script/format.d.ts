import { Buff } from '@cmdcode/buff-utils';
import { ScriptData } from '../../schema/types.js';
declare function toAsm(script?: ScriptData, varint?: boolean): string[];
declare function toBytes(script?: ScriptData, varint?: boolean): Buff;
declare function toParam(script: ScriptData): Buff;
export declare const FmtScript: {
    toAsm: typeof toAsm;
    toBytes: typeof toBytes;
    toParam: typeof toParam;
};
export {};
//# sourceMappingURL=format.d.ts.map