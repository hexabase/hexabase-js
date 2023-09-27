"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HxbSessionStorage = void 0;
class HxbSessionStorage {
    static Write(key, value) {
        localStorage.setItem(key, value);
    }
}
exports.HxbSessionStorage = HxbSessionStorage;
//# sourceMappingURL=sessionStorage.js.map