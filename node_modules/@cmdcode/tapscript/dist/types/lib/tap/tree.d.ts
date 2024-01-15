import { Buff } from '@cmdcode/buff-utils';
import { TapTree, TapProof } from './types.js';
import { Bytes, ScriptData } from '../../schema/types.js';
export declare function getTapTag(tag: string): Buff;
export declare function getTapLeaf(data: Bytes, version?: number): string;
export declare function getTapScript(script: ScriptData, version?: number): string;
export declare function getTapBranch(leafA: string, leafB: string): string;
export declare function getTapRoot(leaves: TapTree): Buff;
export declare function merkleize(taptree: TapTree, target?: string, path?: string[]): TapProof;
export declare function getVersion(version?: number): number;
//# sourceMappingURL=tree.d.ts.map