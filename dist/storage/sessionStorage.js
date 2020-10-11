"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HxbSessionStorage = void 0;
var HxbSessionStorage = /** @class */ (function () {
    function HxbSessionStorage() {
    }
    /**
     * @param  {string} key
     * @param  {string} value
     */
    HxbSessionStorage.Write = function (key, value) {
        sessionStorage.setItem(key, value);
    };
    /**
     * @param  {string} key
     * @returns string
     */
    HxbSessionStorage.Read = function (key) {
        return sessionStorage.getItem(key);
    };
    return HxbSessionStorage;
}());
exports.HxbSessionStorage = HxbSessionStorage;
