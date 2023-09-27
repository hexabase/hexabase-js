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
const HexabaseClient_1 = __importDefault(require("../../../HexabaseClient"));
require('dotenv').config();
const projectId = process.env.APPLICATIONID || '';
const tokenApp = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const url = process.env.URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const client = new HexabaseClient_1.default({ env: 'dev' });
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.login({ email, password, token: tokenApp });
}));
describe('Project', () => {
    describe('#get()', () => {
        it('should get project by workspace id', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jest.useFakeTimers('legacy');
                const workspace = client.currentWorkspace;
                const projects = yield workspace.projects();
                expect(typeof projects[0].id).toBe('string');
            }
            catch (error) {
                console.error(error);
            }
        }));
    });
    describe('#getProjectsAndDatastores()', () => {
        it('should get project and datastore by workspace id', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const workspace = client.currentWorkspace;
                const { projects, datastores } = yield workspace.projectsAndDatastores();
                const project = projects[0];
                expect(typeof project.id).toBe('string');
                const name = project.name;
                expect(typeof name.en).toBe('string');
                expect(typeof project.displayId).toBe('string');
                const datastore = datastores[0];
                if (datastore) {
                    expect(typeof datastore.id).toBe('string');
                    expect(typeof datastore.name).toBe('string');
                }
            }
            catch (error) {
                console.error(error);
            }
        }));
    });
    describe('#getTemplates()', () => {
        it('should get templates without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const workspace = client.currentWorkspace;
                const templates = yield workspace.projectTemplates();
                expect(typeof templates[0].name).toBe('string');
            }
            catch (error) {
                console.error(error);
            }
        }));
    });
    describe('#create()', () => {
        it('should create project', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = client.currentWorkspace;
            const project = yield workspace.project();
            project.name = {
                ja: '新しいプロジェクト',
                en: 'new project'
            };
            const bol = yield project.save();
            expect(bol).toBe(true);
            expect(typeof project.id).toBe('string');
        }));
    });
    describe('#getDetail()', () => {
        it('should get info project', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = client.currentWorkspace;
            const projects = yield workspace.projects();
            const project = projects[0];
            yield project.fetch();
            const name = project.name;
            expect(typeof name.ja).toBe('string');
            expect(name.ja !== '').toBe(true);
            expect(typeof name.en).toBe('string');
        }));
    });
    describe('#updateProjectTheme()', () => {
        it('should update project by id project current without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = client.currentWorkspace;
            const projects = yield workspace.projects();
            const project = projects[0];
            project.theme = 'blue';
            yield project.save();
            yield project.fetch();
            expect(project.theme).toBe('blue');
        }));
    });
    describe('#updateProjectName()', () => {
        it('should update project by id project current without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = client.currentWorkspace;
            const projects = yield workspace.projects();
            const project = projects[0];
            project.name = {
                en: 'test update',
                ja: 'test update',
            };
            const bol = yield project.save();
            expect(bol).toBe(true);
        }));
    });
    describe('#delete()', () => {
        it('should delete project by id project current without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = client.currentWorkspace;
            const project = yield workspace.project();
            project.name = {
                ja: '新しいプロジェクト',
                en: 'new project',
            };
            const bol = yield project.save();
            expect(bol).toBe(true);
            expect(typeof project.id).toBe('string');
            const res = yield project.delete();
            expect(res).toBe(true);
        }));
    });
});
//# sourceMappingURL=project.test.js.map