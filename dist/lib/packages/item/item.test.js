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
const token = process.env.TOKEN || '';
const client = new HexabaseClient_1.default({ env: 'dev' });
const workspaceId = process.env.DEV_WORKSPACE_ID;
const datastoreId = process.env.DEV_DATASOTRE_ID || '';
const linkedDatastoreId = process.env.DEV_RELATED_DATASOTRE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.login({ email, password, token });
}));
describe('Item', () => {
    describe('#get()', () => {
        it('should get items in Ds', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const { totalCount } = yield datastore.itemsWithCount();
            expect(typeof totalCount).toBe('number');
        }));
    });
    describe('#createItemId()', () => {
        it('should create new item id', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const itemId = yield datastore.createItemId();
            expect(typeof itemId).toBe('string');
        }));
    });
    describe('#create()', () => {
        it('should create new items', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            item.set('test_text_unique', name());
            const bol = yield item.save();
            expect(bol).toBe(true);
            expect(typeof item.id).toBe('string');
            yield item.delete();
        }));
    });
    describe('#getHistories()', () => {
        it('should get items histories', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            item.set('test_text_unique', name());
            yield item.save();
            item.set('test_text_unique', name());
            yield item.save();
            const histories = yield item.histories();
            expect(typeof histories[0].id).toBe('string');
            const { unread } = yield item.historiesWithUnread();
            expect(typeof unread).toBe('number');
            yield item.delete();
        }));
    });
    describe('#getItemDetail()', () => {
        it('should get item detail', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            item.set('test_text_unique', name());
            yield item.save();
            expect(typeof item.title).toBe('string');
        }));
    });
    describe('#update()', () => {
        it('should update item in datastore', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            item.set('test_text_unique', name());
            item.set('test_number', 100);
            const bol = yield item.save();
            expect(bol).toBe(true);
            item.set('test_text_unique', name());
            item.set('test_number', 200);
            yield item.save();
            expect(item.revNo).toBe(2);
        }));
    });
    describe('#execute()', () => {
        it('should execute action for item in datastore', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            yield item.save();
            yield item.execute('TestItemActionWithNoAS');
            const item2 = yield datastore.item(item.id);
            expect(item.status).toBe(item2.status);
            yield item.delete();
        }));
    });
});
const name = () => {
    return (new Date).toISOString() + Math.random().toString(32).substring(2);
};
//# sourceMappingURL=item.test.js.map