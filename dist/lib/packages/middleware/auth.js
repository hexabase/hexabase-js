"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const user_1 = require("../../graphql/user");
class AuthMw {
    constructor(urlGraphql) {
        this.urlGraphql = urlGraphql;
        this.urlGr = urlGraphql;
        this.client = new graphql_request_1.GraphQLClient(this.urlGr);
    }
    userInfoAsync(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                userInfo: undefined,
                error: undefined,
            };
            this.client.setHeader('authorization', `Bearer ${token}`);
            try {
                const res = yield this.client.request(user_1.USER_INFO);
                data.userInfo = res.userInfo;
            }
            catch (error) {
                data.error = JSON.stringify(error.response.errors);
            }
            return data;
        });
    }
}
exports.default = AuthMw;
//# sourceMappingURL=auth.js.map