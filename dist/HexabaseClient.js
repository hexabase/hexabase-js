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
const auth_1 = __importDefault(require("./lib/packages/auth"));
const workspace_1 = __importDefault(require("./lib/packages/workspace"));
const user_1 = __importDefault(require("./lib/packages/user"));
const sql_1 = __importDefault(require("./lib/sql"));
const HxbAbstract_1 = require("./HxbAbstract");
const fileObject_1 = __importDefault(require("./lib/packages/fileObject"));
class HexabaseClient {
    constructor(options = {}) {
        switch (options.env) {
            case 'dev':
                this.urlHxb = 'https://stg-hxb-graph.hexabase.com/graphql';
                this.restHxb = 'https://stg-api.hexabase.com';
                this.sseHxb = 'https://dev-sse.hexabase.com';
                break;
            default:
                this.urlHxb = 'https://graphql.hexabase.com/graphql';
                this.restHxb = 'https://api.hexabase.com';
                this.sseHxb = 'https://sse.hexabase.com';
                break;
        }
        const { url, sse, rest } = options;
        if (url && url.trim() !== '') {
            this.urlHxb = url;
        }
        if (rest && rest.trim() !== '') {
            this.restHxb = rest;
        }
        if (sse && sse.trim() !== '') {
            this.sseHxb = sse;
        }
        this.auth = this._initAuth();
    }
    _init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.users = user_1.default;
            HxbAbstract_1.HxbAbstract.client = this;
            this.currentWorkspace = yield workspace_1.default.get();
            this.currentUser = yield this.users.current();
        });
    }
    setToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.tokenHxb = token;
            yield this._init();
        });
    }
    login({ email, password, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (token) {
                yield this.setToken(token);
                return true;
            }
            if (!email || !password) {
                throw Error('Need token or email and password to initialize sdk');
            }
            const res = yield this.auth.login({ email, password });
            if (!res) {
                throw Error(`Need login failed to initialize sdk`);
            }
            yield this.setToken(res);
            return true;
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.auth.logout();
        });
    }
    setWorkspace(workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = workspace ? (typeof workspace === 'string' ? workspace : workspace.id) : undefined;
            if (id) {
                this.currentWorkspace = yield workspace_1.default.current(id);
            }
            if (!this.currentWorkspace.id) {
                this.currentWorkspace = workspace_1.default.fromJson({ w_id: id });
            }
            return true;
        });
    }
    sseUrl() {
        const user = this.currentUser;
        const workspace = this.currentWorkspace;
        return `https://app.hexabase.com/sse?channel=user_${user.id}_${workspace.id}`;
    }
    _initAuth() {
        return new auth_1.default(this.urlHxb);
    }
    workspaces() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._workspaces.length > 0)
                return this._workspaces;
            this._workspaces = yield workspace_1.default.all();
            return this._workspaces;
        });
    }
    workspacesWithCurrent() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._workspaces.length > 0 && this.currentWorkspace) {
                return { workspaces: this._workspaces, workspace: this.currentWorkspace };
            }
            const res = yield workspace_1.default.allWithCurrent();
            this._workspaces = res.workspaces;
            this.currentWorkspace = res.workspace;
            return res;
        });
    }
    workspace(id) {
        return new workspace_1.default({ id });
    }
    query(projectId) {
        return new sql_1.default({ projectId });
    }
    upload(fileName, file) {
        return fileObject_1.default.upload(fileName, file);
    }
    download(fileId) {
        return fileObject_1.default.download(fileId);
    }
    file(id) {
        const f = new fileObject_1.default({ id });
        return f;
    }
    invite(emails, domain, options, workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = Object.assign(Object.assign({ domain }, {
                users: emails.map(email => {
                    if (workspace) {
                        return { email, exclusive_w_id: workspace.id };
                    }
                    else {
                        return { email };
                    }
                }),
            }), options);
            const res = this.currentWorkspace.rest('post', '/api/v0/userinvite', {}, params);
            return res;
        });
    }
}
exports.default = HexabaseClient;
//# sourceMappingURL=HexabaseClient.js.map