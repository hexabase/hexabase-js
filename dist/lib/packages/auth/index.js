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
const auth_1 = require("../../graphql/auth");
const helper_1 = require("../../util/helper");
class Auth {
    constructor(urlGraphql) {
        this.urlGraphql = urlGraphql;
        this.stateChangeEmitters = new Map();
        this.client = new graphql_request_1.GraphQLClient(urlGraphql);
    }
    login(loginInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.request(auth_1.LOGIN, { loginInput });
            return res.login.token;
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.request(user_1.LOG_OUT);
            return res.logout.success;
        });
    }
    onAuthStateChange(callback) {
        const id = (0, helper_1.uuid)();
        const subscription = {
            id,
            callback,
            unsubscribe: () => {
                this.stateChangeEmitters.delete(id);
            },
        };
        this.stateChangeEmitters.set(id, subscription);
        return subscription;
    }
}
exports.default = Auth;
//# sourceMappingURL=index.js.map