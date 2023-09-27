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
    describe('#createComment()', () => {
        it('should create comment items histories', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            item.set('test_text_unique', name());
            yield item.save();
            item.set('test_number', 100);
            yield item.save();
            const comment = item.comment();
            comment.comment = 'create comment';
            const bol = yield comment.save();
            expect(bol).toBe(true);
            yield item.delete();
        }));
    });
    describe('#updateComment()', () => {
        it('should update comment items histories', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const newComment = 'update comment message';
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            item.set('test_text_unique', name());
            yield item.save();
            const histories = yield item.histories();
            const comment = histories[0];
            comment.comment = newComment;
            const bol = yield comment.save();
            expect(bol).toBe(true);
            const histories2 = yield item.histories();
            expect(histories2[0].comment).toBe(newComment);
            expect(histories2[0].id).toBe(histories[0].id);
        }));
    });
    describe('#deleteComment()', () => {
        it('should delete comment items histories', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const newComment = 'update comment message';
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            item.set('test_text_unique', name());
            yield item.save();
            const histories = yield item.histories();
            const bol = yield histories[0].delete();
            expect(bol).toBe(true);
            const histories2 = yield item.histories();
            expect(histories2.length + 1).toBe(histories.length);
        }));
    });
});
const name = () => {
    return (new Date).toISOString() + Math.random().toString(32).substring(2);
};
//# sourceMappingURL=itemHistory.test.js.map