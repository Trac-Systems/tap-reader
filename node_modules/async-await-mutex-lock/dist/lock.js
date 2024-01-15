"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lock = void 0;
class Lock {
    constructor() {
        this._isAcquired = false;
        this._acquiredMap = new Map();
        this.waitingMap = new Map();
        this.waitingList = [];
    }
    acquire(key) {
        if (key) {
            if (!this._acquiredMap.has(key) || !this._acquiredMap.get(key)) {
                this._acquiredMap.set(key, true);
                return Promise.resolve();
            }
        }
        else if (!this._isAcquired) {
            this._isAcquired = true;
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            if (key) {
                if (this.waitingMap.has(key)) {
                    let resolvers = this.waitingMap.get(key);
                    resolvers.push(resolve);
                    this.waitingMap.set(key, resolvers);
                }
                else {
                    this.waitingMap.set(key, [resolve]);
                }
            }
            else {
                this.waitingList.push(resolve);
            }
        });
    }
    isAcquired(key) {
        if (key) {
            if (!this._acquiredMap.has(key)) {
                return false;
            }
            else {
                return this._acquiredMap.get(key);
            }
        }
        else {
            return this._isAcquired;
        }
    }
    release(key) {
        var _a;
        if (key) {
            if (!this._acquiredMap.has(key) || !this._acquiredMap.get(key)) {
                throw new Error("Please acquire a lock for " + key + " before releasing!!");
            }
            else {
                if (((_a = this.waitingMap.get(key)) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                    let resolve = this.waitingMap.get(key).shift();
                    resolve();
                }
                else {
                    if (this.waitingMap.has(key)) {
                        this.waitingMap.delete(key);
                    }
                    this._acquiredMap.set(key, false);
                }
            }
        }
        else {
            if (!this._isAcquired) {
                throw new Error("Please acquire a lock before releasing!!");
            }
            else {
                if (this.waitingList.length > 0) {
                    let resolve = this.waitingList.shift();
                    resolve();
                }
                else {
                    this._isAcquired = false;
                }
            }
        }
    }
}
exports.Lock = Lock;
//# sourceMappingURL=lock.js.map