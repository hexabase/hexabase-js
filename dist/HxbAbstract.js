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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HxbAbstract = void 0;
const graphql_request_1 = require("graphql-request");
const HexabaseClient_1 = __importDefault(require("./HexabaseClient"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const form_data_1 = __importDefault(require("form-data"));
class HxbAbstract {
    constructor(params) {
        if (params)
            this.sets(params);
    }
    static request(query, variables, _client) {
        return new HxbAbstract().request(query, variables, _client);
    }
    request(query, variables, _client) {
        var _a;
        const client = _client instanceof HexabaseClient_1.default ? _client : HxbAbstract.client;
        const gqClient = new graphql_request_1.GraphQLClient(client.urlHxb, {
            timeout: 50000,
            headers: {
                authorization: `Bearer ${client.tokenHxb}`,
            },
        });
        try {
            return gqClient.request(query, variables);
        }
        catch (error) {
            throw JSON.stringify((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.errors);
        }
    }
    static rest(method, path, query, body, options = {}) {
        return new HxbAbstract().rest(method, path, query, body, options);
    }
    rest(method, path, queries, bodies, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = queries ? new URLSearchParams(queries).toString() : '';
            const url = `${HxbAbstract.client.restHxb}${path}${query !== '' ? `?${query}` : ''}`;
            try {
                const res = yield this.exec(method, url, bodies, options);
                if (options.response === 'blob')
                    return yield res.blob();
                if (options.binary)
                    return JSON.parse(yield res.text());
                return yield res.json();
            }
            catch (error) {
                console.log(error);
                throw error.response.data;
            }
        });
    }
    exec(method, url, bodies, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                method,
                headers: {
                    Authorization: `Bearer ${HxbAbstract.client.tokenHxb}`,
                }
            };
            if (!options.binary) {
                params.headers = Object.assign(Object.assign({}, params.headers), {
                    'Content-Type': 'application/json',
                });
            }
            if (['get', 'delete'].indexOf(method.toLocaleLowerCase()) > -1) {
                return (0, node_fetch_1.default)(url, params);
            }
            if (['post', 'put'].indexOf(method.toLocaleLowerCase()) > -1) {
                params.body = (yield this._makeBody(bodies, options.binary));
                return (0, node_fetch_1.default)(url, params);
            }
            throw new Error(`Method ${method} is not supported`);
        });
    }
    _makeBody(bodies = {}, binary = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!binary)
                return JSON.stringify(bodies);
            const form = new form_data_1.default;
            const filename = bodies.fileName || bodies.filename;
            for (const key in bodies) {
                const body = bodies[key];
                if (body instanceof Blob) {
                    form.append(key, body, filename);
                }
                else {
                    form.append(key, body);
                }
            }
            return form;
        });
    }
    static fromJson(json) {
        const obj = new this;
        obj.sets(json);
        return obj;
    }
    sets(params) {
        if (params.workspace)
            this.set('workspace', params.workspace);
        if (params.project)
            this.set('project', params.project);
        if (params.datastore)
            this.set('datastore', params.datastore);
        if (params.item)
            this.set('item', params.item);
        Object.keys(params).forEach(key => {
            this.set(key, params[key]);
        });
        return this;
    }
    set(key, value) {
        return this;
    }
}
exports.HxbAbstract = HxbAbstract;
//# sourceMappingURL=HxbAbstract.js.map