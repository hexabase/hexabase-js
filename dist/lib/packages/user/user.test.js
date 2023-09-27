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
const _1 = __importDefault(require("."));
const auth_1 = __importDefault(require("../auth"));
const __1 = require("../../../");
require('dotenv').config();
const url = process.env.URL || '';
const confirmationId = process.env.CONFIRMATIONID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const workspaceId = process.env.WORKSPACEID || '';
const groupId = process.env.GROUP_ID || '';
const client = new __1.HexabaseClient({ env: 'dev' });
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (email && password) {
        console.log('[email, password]: ', email, password);
        const auth = new auth_1.default(url);
        const token = yield auth.login({ email, password });
        return token;
    }
}));
describe('User', () => {
    describe('#register()', () => {
        it('should get user register info by confirm id without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const userRegister = yield _1.default.confirm(confirmationId);
            expect(typeof userRegister.id).toBe('string');
            expect(typeof userRegister.email).toBe('string');
        }));
    });
    describe('#getPasswordExpire()', () => {
        it('should get user password expiry without error', () => __awaiter(void 0, void 0, void 0, function* () {
        }));
    });
    describe('#userConfirm()', () => {
        it('should get user password expiry without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const userConfirm = yield _1.default.confirm(confirmationId);
            expect(typeof userConfirm.email).toBe('string');
            expect(typeof userConfirm.id).toBe('string');
        }));
    });
    describe('#get()', () => {
        it('should get userinfo by token without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.auth.login({ email, password });
            const user = client.currentUser;
            expect(typeof user.userName).toBe('string');
            expect(typeof user.email).toBe('string');
            expect(typeof user.profilePicture).toBe('string');
            expect(typeof user.id).toBe('string');
            expect(typeof user.currentWorkspace.id).toBe('string');
            expect(typeof user.isWorkspaceAdmin).toBe('string');
        }));
    });
    describe('#usernameExists()', () => {
        it('should add user to workspace without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
        }));
    });
    describe('#postInviteUsers()', () => {
        it('should add user to workspace without error', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            jest.useFakeTimers('legacy');
            const res = yield ((_a = client.currentWorkspace) === null || _a === void 0 ? void 0 : _a.invite(['test@hexabase.com'], 'test.hexabase.com'));
            expect(typeof res[0].email).toBe('string');
        }));
    });
});
//# sourceMappingURL=user.test.js.map