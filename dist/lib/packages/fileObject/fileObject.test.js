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
require('dotenv').config();
const HexabaseClient_1 = __importDefault(require("../../../HexabaseClient"));
const _1 = __importDefault(require("."));
const buffer_1 = require("buffer");
const token = process.env.TOKEN || '';
const client = new HexabaseClient_1.default({ env: 'dev' });
const workspaceId = process.env.DEV_WORKSPACE_ID;
const datastoreId = process.env.DEV_DATASOTRE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.login({ email, password, token });
}));
describe('File', () => {
    describe('#upload()', () => {
        it('should upload the text file', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const attachment = new buffer_1.Blob(['Hello, world!'], { type: 'text/plain' });
            const file = yield client.upload('test.txt', attachment);
            expect(typeof file.id).toBe('string');
        }));
    });
    describe('#download()', () => {
        it('should download the text file', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const str = 'Hello, world!';
            const type = 'text/plain';
            const attachment = new buffer_1.Blob([str], { type });
            const file = yield client.upload('test.txt', attachment);
            expect(typeof file.id).toBe('string');
            const f = yield client.download(file.id);
            expect(f instanceof _1.default).toBe(true);
            const text = yield f.data.text();
            expect(text).toEqual(str);
        }));
    });
    describe('#delete()', () => {
        it('should delete the text file', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const str = 'Hello, world!';
            const type = 'text/plain';
            const attachment = new buffer_1.Blob([str], { type });
            const f = yield client.upload('test.txt', attachment);
            expect(typeof f.id).toBe('string');
            const file = yield client.file(f.id);
            expect(file.id).toBe(f.id);
            const bol = yield file.delete();
            expect(bol).toBe(true);
        }));
    });
    describe('#uploadFile()', () => {
        it('should upload the file', () => __awaiter(void 0, void 0, void 0, function* () {
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            const file = item.file();
            const message = 'hello world';
            const blob = new buffer_1.Blob([message], { type: 'text/plain' });
            file
                .set('name', 'test_file.txt')
                .set('data', blob);
            const bol = yield item
                .set('test_file', [file])
                .save();
            expect(bol).toBe(true);
            const ary = item.get('test_file');
            expect(ary.length).toBe(1);
            expect(ary[0].name).toBe('test_file.txt');
            yield ary[0].download();
            const text = yield ary[0].data.text();
            expect(text).toBe(message);
            yield item.delete();
        }));
        it('should upload the files', () => __awaiter(void 0, void 0, void 0, function* () {
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            const file = item.file();
            const message = 'hello world';
            const blob = new buffer_1.Blob([message], { type: 'text/plain' });
            file
                .set('name', 'test_file.txt')
                .set('data', blob);
            const file2 = item.file();
            yield file2
                .set('name', 'test_file2.txt')
                .set('data', blob);
            yield item
                .set('test_file', [file])
                .save();
            const bol = yield item
                .add('test_file', file2)
                .save();
            expect(bol).toBe(true);
            yield item.delete();
        }));
    });
});
//# sourceMappingURL=fileObject.test.js.map