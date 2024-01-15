import { Bytes } from '../schema/types';
export declare function isHex<T>(value: T): value is Extract<T, string>;
export declare function isBytes<T>(value: T): value is Extract<T, Bytes>;
export declare function isValidAnnex(annex: any): boolean;
//# sourceMappingURL=check.d.ts.map