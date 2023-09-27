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
const url = process.env.URL || '';
const tokenWs = process.env.TOKEN || '';
const taskId = process.env.TASKID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
let newWorkspaceId = '';
const createWorkSpaceInput = {
    name: 'new Workspace'
};
const updateWorkspaceSettingsInput = {
    payload: {}
};
const client = new HexabaseClient_1.default({ env: 'dev' });
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.login({ email, password, token: tokenWs });
        const ary = yield client.workspaces();
        ary.forEach((workspace) => __awaiter(void 0, void 0, void 0, function* () {
            if (workspace.name === 'new ws name') {
                yield workspace.archive();
            }
        }));
    }
    catch (error) {
        console.log(`Error in login ${error}`);
        process.exit(1);
    }
}));
describe('Workspace', () => {
    describe('#create()', () => {
        it('should create workspace', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = client.workspace();
            workspace.name = 'new Workspace';
            workspace.id = 'newWorkspaceId';
            try {
                yield workspace.save();
                newWorkspaceId = workspace.id;
                expect(typeof workspace.id).toBe('string');
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#setCurrent()', () => {
        it('should set current workspace', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const { workspace } = yield client.workspacesWithCurrent();
            try {
                const bol = yield client.setWorkspace(workspace);
                expect(bol).toEqual(true);
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#getCurrent()', () => {
        it('should get workspaces id current', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const workspace = client.currentWorkspace;
                expect(typeof workspace.id).toBe('string');
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#get()', () => {
        it('should get all workspaces', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const { workspaces, workspace } = yield client.workspacesWithCurrent();
                expect(typeof workspace.id).toBe('string');
                expect(typeof workspaces[0].name).toBe('string');
                expect(typeof workspaces[0].id).toBe('string');
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#getDetail()', () => {
        it('should get workspace detail by id', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            try {
                const workspace = client.currentWorkspace;
                expect(typeof workspace.id).toBe('string');
                expect(typeof workspace.name).toBe('string');
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#updateWorkspaceSettings', () => {
        it('should update workspace settings', () => __awaiter(void 0, void 0, void 0, function* () {
            const workspace = client.currentWorkspace;
            try {
                const newName = 'new ws name';
                workspace.name = newName;
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#getPasswordPolicy()', () => {
        it('should get workspace password policy', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = client.currentWorkspace;
            try {
                const passwordPolicy = yield workspace.getPasswordPolicy();
                expect(typeof passwordPolicy.expiredDay).toBe('number');
                expect(typeof passwordPolicy.useExpiredDay).toBe('boolean');
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#getFunctionality()', () => {
        it('should get workspace functionlity', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = client.currentWorkspace;
            try {
                const workspaceFunction = yield workspace.getFunctionality();
                expect(typeof workspaceFunction.workspace.id).toBe('string');
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#getUsage()', () => {
        it('should get workspace usage', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = client.currentWorkspace;
            const wsUsage = yield workspace.getUsage();
            expect(typeof wsUsage.workspace.id).toBe('string');
            expect(typeof wsUsage.datastores).toBe('number');
        }));
    });
    describe('#getGroupChildren()', () => {
        it('should get workspace childrent in group', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = yield client.workspace('62bac0f0a65b33ec0c212a67');
            try {
                const group = yield workspace.group();
                if (group) {
                    expect(typeof group.children.length).toBe('number');
                }
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#archiveWorkspace', () => {
        it('should archive workspace', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const workspace = client.currentWorkspace;
            try {
                yield workspace.archive();
            }
            catch (error) {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
});
//# sourceMappingURL=workspace.test.js.map