export declare class Lock<T> {
    private _isAcquired;
    private _acquiredMap;
    private waitingMap;
    private waitingList;
    acquire(key?: T): Promise<void>;
    isAcquired(key?: T): boolean;
    release(key?: T): void;
}
//# sourceMappingURL=lock.d.ts.map