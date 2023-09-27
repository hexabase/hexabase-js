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
const project_1 = require("../../graphql/project");
const datastore_1 = __importDefault(require("../datastore"));
const report_1 = __importDefault(require("../report"));
class Project extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this._datastores = [];
    }
    set(key, value) {
        switch (key) {
            case 'application_id':
            case 'p_id':
            case 'id':
                if (value)
                    this.id = value;
                break;
            case 'name':
                this.name = value;
                break;
            case 'display_id':
                this.displayId = value;
                break;
            case 'theme':
                this.theme = value;
                break;
            case 'display_order':
                this.displayOrder = value;
                break;
            case 'workspace':
                this.workspace = value;
                break;
            case 'datastores':
                if (!value)
                    break;
                this._datastores = value.map(datastore => datastore_1.default.fromJson(Object.assign({ project: this }, datastore)));
                break;
            case 'template_id':
                this.templateId = value;
                break;
        }
        return this;
    }
    static all(workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(project_1.GET_APPLICATIONS, { workspaceId: workspace.id });
            return res.getApplications.map(params => Project.fromJson(Object.assign({ workspace }, params)));
        });
    }
    datastores() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._datastores.length > 0)
                return this._datastores;
            this._datastores = yield datastore_1.default.all({
                project: this
            });
            return this._datastores;
        });
    }
    datastore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return new datastore_1.default({ project: this, id });
            }
            if (this._datastores.length === 0)
                yield this.datastores();
            const datastore = this._datastores.find(datastore => datastore.id === id || datastore.displayId === id);
            if (!datastore)
                throw new Error(`Datastore ${id} not found`);
            yield datastore.fetch();
            return datastore;
        });
    }
    datastoreSync(id) {
        if (!id) {
            return new datastore_1.default({ project: this, id });
        }
        const datastore = this._datastores.find(datastore => datastore.id === id || datastore.displayId === id);
        if (!datastore)
            throw new Error(`Datastore ${id} not found`);
        return datastore;
    }
    reports() {
        return __awaiter(this, void 0, void 0, function* () {
            return report_1.default.all(this);
        });
    }
    static allWithDatastores(workspace) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(project_1.GET_APPLICATION_AND_DATASTORE, { workspaceId: workspace.id });
            const projects = res.getApplicationAndDataStore.map(params => Project.fromJson(Object.assign({ workspace }, params)));
            const datastores = [];
            projects.forEach(project => {
                datastores.push(...project._datastores);
            });
            return {
                projects,
                datastores,
            };
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id) {
                return this.update();
            }
            return this.create();
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.name === 'string') {
                throw new Error('name Japanese and English are required');
            }
            const params = {
                name: this.name,
            };
            if (this.templateId)
                params.tp_id = this.templateId;
            const res = yield this.request(project_1.APPLICATION_CREATE_PROJECT, { createProjectParams: params });
            this.id = res.applicationCreateProject.project_id;
            return true;
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.name === 'string') {
                throw new Error('name Japanese and English are required');
            }
            const payload = {
                project_id: this.id,
                project_name: this.name,
                project_displayid: this.displayId,
                theme: this.theme,
            };
            const res = yield this.request(project_1.UPDATE_PROJECT_NAME, { payload });
            return res.updateProjectName.success;
        });
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(project_1.GET_INFO_PROJECT, { projectId: this.id });
            this.sets(res.getInfoProject);
            return true;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                project_id: this.id,
            };
            const res = yield this.request(project_1.DELETE_PROJECT, { payload });
            return res.deleteProject.success;
        });
    }
}
exports.default = Project;
//# sourceMappingURL=index.js.map