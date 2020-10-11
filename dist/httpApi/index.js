"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.baseURL = 'http://localhost:3000';
axios_1.default.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios_1.default.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
var HttpAPI = /** @class */ (function () {
    function HttpAPI() {
    }
    /**
     * @param  {string} apiUrl
     * @param  {any} payload
     * @returns Promise
     */
    HttpAPI.Post = function (apiUrl, payload) {
        return new Promise(function (resolve, reject) {
            axios_1.default.post("/api/" + apiUrl, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (response) { return resolve(response.data); });
        });
    };
    return HttpAPI;
}());
exports.default = HttpAPI;
