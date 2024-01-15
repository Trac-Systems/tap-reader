import { Networks, ScriptData } from '../../schema/types.js';
import { AddressData, AddressType } from './schema.js';
export declare const ADDRESS_TYPES: AddressType[];
export declare function decodeAddress(address: string): AddressData;
export declare function fromScriptPubKey(script: ScriptData, network?: Networks): string;
export declare function toScriptPubKey(address: string): ScriptData;
//# sourceMappingURL=utils.d.ts.map