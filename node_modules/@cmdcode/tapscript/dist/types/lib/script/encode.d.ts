import { Buff } from '@cmdcode/buff-utils';
import { ScriptData, Word } from '../../schema/types.js';
export declare function encodeScript(script?: ScriptData, varint?: boolean): Buff;
export declare function encodeWords(wordArray: Word[]): Uint8Array;
export declare function encodeWord(word: Word): Uint8Array;
//# sourceMappingURL=encode.d.ts.map