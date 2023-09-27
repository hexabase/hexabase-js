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
const HxbAbstract_1 = require("../../../HxbAbstract");
const project_1 = __importDefault(require("../project"));
const workspace_1 = require("../../graphql/workspace");
const language_1 = __importDefault(require("../language"));
const passwordPolicy_1 = __importDefault(require("../passwordPolicy"));
const redirect_1 = __importDefault(require("../redirect"));
const workspaceFunction_1 = __importDefault(require("../workspaceFunction"));
const workspaceUsage_1 = __importDefault(require("../workspaceUsage"));
const user_1 = __importDefault(require("../user"));
const userSession_1 = __importDefault(require("../userSession"));
const group_1 = __importDefault(require("../group"));
const appFunction_1 = __importDefault(require("../appFunction"));
const template_1 = __importDefault(require("../template"));
class Workspace extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this._groups = [];
    }
    static all() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield Workspace.allWithCurrent();
            return res.workspaces;
        });
    }
    static get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id)
                yield this._current(id);
            const res = yield this.request(workspace_1.WORKSPACE_DETAIL);
            return Workspace.fromJson(res.workspace);
        });
    }
    static current(workspaceId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (workspaceId) {
                const bol = yield this._current(workspaceId);
                if (!bol)
                    throw new Error('Set current workspace failed');
            }
            return this.get();
        });
    }
    static _current(workspaceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(workspace_1.SET_CURRENT_WORKSPACE, {
                setCurrentWorkSpaceInput: {
                    workspace_id: workspaceId,
                }
            });
            return res.setCurrentWorkSpace.success;
        });
    }
    static allWithCurrent() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(workspace_1.WORKSPACES);
            const { workspaces, current_workspace_id } = res.workspaces;
            const ary = workspaces
                .map((params) => Workspace.fromJson(params));
            return { workspaces: ary, workspace: ary.find(w => w.id === current_workspace_id) };
        });
    }
    set(key, value) {
        if (!value)
            return this;
        switch (key) {
            case 'w_id':
            case 'workspace_id':
                this.id = value;
                break;
            case 'ws_key':
                this.wsKey = value;
                break;
            case 'workspace_name':
                this.name = value;
                break;
            case 'app_functions':
                this.appFunctions = appFunction_1.default.fromJson(value);
                break;
            case 'created_at':
                this.createdAt = new Date(value);
                break;
            case 'updated_at':
                this.updatedAt = new Date(value);
                break;
            case 'name':
                this.name = value;
                break;
            case 'plan_name':
                this.planName = value;
                break;
            case 'plan_id':
                this.planId = value;
                break;
            case 'languages':
                this.languages = value
                    .map((lang) => language_1.default.fromJson(lang));
                break;
            case 'pwd_policy':
                this.passwordPolicy = passwordPolicy_1.default.fromJson(value);
                break;
            case 'redirect':
                this.redirect = redirect_1.default.fromJson(value);
                break;
            case 'user_id':
                this.userId = value;
                break;
            case 'ws_admin':
                this.wsAdmin = value;
                break;
            case 'user_sessions':
                this.userSession = userSession_1.default.fromJson(value);
                break;
            case 'ws_admin_users':
                value = value;
                this.workspaceAdminUsers = value.map((user) => user_1.default.fromJson(user));
                break;
            case 'ws_functions':
                this.workspaceFunction = workspaceFunction_1.default.fromJson(value);
                this.workspaceFunction.workspace = this;
                break;
            case 'ws_usage':
                this.workspaceUsage = workspaceUsage_1.default.fromJson(value);
                this.workspaceUsage.workspace = this;
                break;
        }
        return this;
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Workspace.current(this.id);
            const res = yield this.request(workspace_1.WORKSPACE_DETAIL);
            this.sets(res.workspace);
            return true;
        });
    }
    getPasswordPolicy() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(workspace_1.WORKSPACE_PASSWORD_POLICY, { workingspaceId: this.id });
            this.passwordPolicy = passwordPolicy_1.default.fromJson(res.workspacePasswordPolicy);
            return this.passwordPolicy;
        });
    }
    getFunctionality() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                wsFunctionality: undefined,
                error: undefined,
            };
            const res = yield this.request(workspace_1.WORKSPACE_FUNCTIONALITY, { workingspaceId: this.id });
            if (!this.workspaceFunction) {
                this.workspaceFunction = new workspaceFunction_1.default(this);
            }
            this.workspaceFunction = workspaceFunction_1.default.fromJson(Object.assign({ workspace: this }, res.workspaceFunctionality));
            return this.workspaceFunction;
        });
    }
    getUsage() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(workspace_1.WORKSPACE_USAGE, { workingspaceId: this.id });
            this.workspaceUsage = workspaceUsage_1.default.fromJson(Object.assign({ workspace: this }, res.workspaceUsage));
            return this.workspaceUsage;
        });
    }
    group(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const g = this._groups.find(g => g.id === id);
                if (g)
                    return g;
            }
            const group = new group_1.default({ workspace: this, id });
            yield group.fetch();
            this._groups.push(group);
            return group;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                throw new Error('Currently, workspace updating is not support.');
            return this.create();
        });
    }
    create() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const createWorkSpaceInput = {
                name: this.name,
            };
            const res = yield this.request(workspace_1.CREATE_WORKSPACE, { createWorkSpaceInput });
            if ((_a = res.createWorkspace) === null || _a === void 0 ? void 0 : _a.w_id) {
                this.id = (_b = res.createWorkspace) === null || _b === void 0 ? void 0 : _b.w_id;
                return true;
            }
            else {
                return false;
            }
        });
    }
    toJson() {
        const params = {
            w_id: this.id,
            id: this.id,
        };
        if (this.name)
            params.name = this.name;
        if (this.planId)
            params.plan_id = this.planId;
        if (this.planName)
            params.plan_name = this.planName;
        if (this.userId)
            params.user_id = this.userId;
        return params;
    }
    archive() {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                w_id: this.id,
                archived: true,
            };
            const res = yield this.request(workspace_1.ARCHIVE_WORKSPACE, { payload });
            return !res.error;
        });
    }
    project(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = new project_1.default({ workspace: this, id });
            if (id)
                yield project.fetch();
            return project;
        });
    }
    projects() {
        return project_1.default.all(this);
    }
    projectsAndDatastores() {
        return project_1.default.allWithDatastores(this);
    }
    projectTemplates() {
        return template_1.default.all();
    }
    invite(emails, domain, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return Workspace.client.invite(emails, domain, options, this);
        });
    }
}
exports.default = Workspace;
//# sourceMappingURL=index.js.map