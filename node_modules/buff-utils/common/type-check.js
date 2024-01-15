var _toString = Object.prototype.toString;
export function isObject(v) {
    return v !== null && _toString.call(v) === '[object Object]';
}
//# sourceMappingURL=type-check.js.map