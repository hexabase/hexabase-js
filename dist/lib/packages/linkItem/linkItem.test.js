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
describe('ItemLink', () => {
    describe('#createLink()', () => {
        it('should create item link in datastore', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore1 = yield project.datastore(datastoreId);
            const datastore2 = yield project.datastore(linkedDatastoreId);
            const item1 = yield datastore1.item();
            const item2 = yield datastore2.item();
            yield item2
                .set('title', (new Date).toISOString() + Math.random().toString(32).substring(2))
                .save();
            const item3 = yield datastore2.item();
            yield item3
                .set('title', (new Date).toISOString() + Math.random().toString(32).substring(2))
                .save();
            const randomString = Math.random().toString(36).substring(7);
            const bol = yield item1
                .set('test_text', `${(new Date).toISOString()}-${randomString}`)
                .set('test_dslookup', item2)
                .link(item2)
                .link(item3)
                .save();
            expect(bol).toBe(true);
        }));
    });
    describe('#deleteLink()', () => {
        it('should delete item link in datastore', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore1 = yield project.datastore(datastoreId);
            const datastore2 = yield project.datastore(linkedDatastoreId);
            const item1 = yield datastore1.item();
            const item2 = yield datastore2.item();
            const item3 = yield datastore2.item();
            yield item2
                .set('title', name())
                .save();
            yield item3
                .set('title', name())
                .save();
            yield item1
                .set('test_text', name())
                .set('test_dslookup', item2)
                .link(item2)
                .link(item3)
                .save();
            const ary = yield item1.links(item2.datastore.id);
            console.log({ ary });
            const bol = yield item1
                .unlink(item2)
                .save();
            expect(bol).toBe(true);
        }));
    });
    describe('#getRelated()', () => {
        it('should get related items', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore1 = yield project.datastore(datastoreId);
            const datastore2 = yield project.datastore(linkedDatastoreId);
            const item1 = yield datastore1.item();
            const item2 = yield datastore2.item();
            yield item2
                .set('title', (new Date).toISOString() + Math.random().toString(32).substring(2))
                .save();
            const item3 = yield datastore2.item();
            yield item3
                .set('title', (new Date).toISOString() + Math.random().toString(32).substring(2))
                .save();
            const randomString = Math.random().toString(36).substring(7);
            const bol = yield item1
                .set('test_text', `${(new Date).toISOString()}-${randomString}`)
                .set('test_dslookup', item2)
                .link(item2)
                .link(item3)
                .save();
            expect(bol).toBe(true);
            const items = yield item1.links(linkedDatastoreId);
            expect(items[0].datastore.id).toBe(linkedDatastoreId);
        }));
    });
});
const name = () => {
    return (new Date).toISOString() + Math.random().toString(32).substring(2);
};
//# sourceMappingURL=linkItem.test.js.map