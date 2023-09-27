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
const field_1 = __importDefault(require("../field"));
require('dotenv').config();
const tokenDs = process.env.TOKEN || '';
const client = new HexabaseClient_1.default;
const workspaceId = process.env.DEV_WORKSPACE_ID;
const datastoreId = process.env.DEV_DATASOTRE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
let project;
let datastore;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.login({ email, password, token: tokenDs });
    client.setWorkspace(workspaceId);
    const ary = yield client.currentWorkspace.projects();
    const p = ary.map((project) => {
        const name = project.name;
        if (name.ja === 'JA Project' || name.ja === '新しいプロジェクト') {
            return project.delete();
        }
    });
    yield Promise.all(p);
    project = yield client.currentWorkspace.project();
    project.name = {
        en: 'EN Project',
        ja: 'JA Project',
    };
    yield project.save();
    datastore = yield project.datastore();
    yield datastore.save();
    yield new Promise(resolve => setTimeout(resolve, 5000));
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield project.delete();
}));
describe('Datastore', () => {
    describe('#create()', () => {
        it('should create datastore without error', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const datastore = yield project.datastore();
                const bol = yield datastore.save();
                expect(bol).toBe(true);
            }
            catch (e) {
                throw new Error(`Error: ${e}`);
            }
        }));
    });
    describe('#get()', () => {
        it('should get all datastore without error', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const datastores = yield project.datastores();
                expect(typeof datastores.length).toBe('number');
            }
            catch (e) {
                throw new Error(`Error: ${e}`);
            }
        }));
    });
    describe('#getDetail()', () => {
        it('should get fields without error', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const project = yield client.currentWorkspace.project(projectId);
                const datastore = yield project.datastore(datastoreId);
                const bol = yield datastore.fetch();
                expect(bol).toBe(true);
            }
            catch (e) {
                throw new Error(`Error: ${e}`);
            }
        }));
    });
    describe('#getFields()', () => {
        it('should get fields in Ds', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const project = yield client.currentWorkspace.project(projectId);
                const datastore = yield project.datastore(datastoreId);
                const fields = yield datastore.fields();
                expect(fields[0] instanceof field_1.default).toBe(true);
            }
            catch (e) {
                throw new Error(`Error: ${e}`);
            }
        }));
    });
    describe('#getField()', () => {
        it('should get field setting in Ds', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const project = yield client.currentWorkspace.project(projectId);
                const datastore = yield project.datastore(datastoreId);
                const fields = yield datastore.fields();
                const field = yield datastore.field(fields[0].id);
                expect(field instanceof field_1.default).toBe(true);
            }
            catch (e) {
                throw new Error(`Error: ${e}`);
            }
        }));
    });
    describe('#getActions()', () => {
        it('should get actions in Ds', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const project = yield client.currentWorkspace.project(projectId);
                const datastore = yield project.datastore(datastoreId);
                const actions = yield datastore.actions();
                const action = actions[0];
                expect(typeof action.name).toBe('string');
                expect(typeof action.datastore.id).toBe('string');
            }
            catch (e) {
                throw new Error(`Error: ${e}`);
            }
        }));
    });
    describe('#getStatuses()', () => {
        it('should get status in Ds', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const status = yield datastore.statuses();
            expect(typeof status[0].displayId).toBe('string');
            expect(typeof status[0].id).toBe('string');
        }));
    });
    describe('#getAction()', () => {
        it('should get action by Id in Ds', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const action = yield datastore.action('new');
            expect(typeof action.id).toBe('string');
            expect(typeof action.name).toBe('string');
        }));
    });
    describe('#validateDatastoreDisplayID()', () => {
        it('should validate display id datastore current without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const project = yield client.currentWorkspace.project(projectId);
                const datastore = yield project.datastore(datastoreId);
                const bol = yield datastore.validateDisplayId('dsId_update_001');
                expect(typeof bol).toBe('boolean');
                expect(bol).toBe(false);
            }
            catch (e) {
                throw new Error(`Error: ${e}`);
            }
        }));
    });
    describe('#updateDatastore()', () => {
        it('should update datastore current without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            datastore.displayId = 'dsId_update_002';
            datastore.name = {
                en: 'EN name update',
                ja: 'JA name update',
            };
            try {
                const bol = yield datastore.save();
                expect(bol).toBe(true);
            }
            catch (e) {
                throw new Error(`Error: ${e}`);
            }
        }));
    });
    describe('#getAutoNumber()', () => {
        it('should datastore get field auto number without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const project = yield client.currentWorkspace.project(projectId);
                const datastore = yield project.datastore(datastoreId);
                const number = yield datastore.autoNumber('autoNum');
                expect(typeof number).toBe('number');
            }
            catch (e) {
                throw new Error(`Error: ${e}`);
            }
        }));
    });
    describe('#deleteDatastore()', () => {
        it('should delete datastore current without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const bol = yield datastore.delete();
                expect(bol).toBe(true);
            }
            catch (e) {
                throw new Error(`Error: ${e}`);
            }
        }));
    });
});
//# sourceMappingURL=datastore.test.js.map