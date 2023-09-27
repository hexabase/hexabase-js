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
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../../");
require('dotenv').config();
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const client = new __1.HexabaseClient({ env: 'dev' });
describe('Auth', () => {
    describe('#login()', () => {
        it('should get field setting in Ds', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const bol = yield client.login({ email, password });
            expect(typeof bol).toBe('boolean');
        }));
    });
    describe('#logout()', () => {
        it('should get logout user', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const bol = yield client.login({ email, password });
            expect(typeof bol).toBe('boolean');
            const bol2 = yield client.logout();
            expect(typeof bol2).toBe(true);
        }));
    });
    describe('#onAuthStateChange()', () => {
        it('should onAuthStateChange', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.login({ email, password });
            const id = client.auth.onAuthStateChange((event, session) => {
            });
            expect(typeof id).toBe('string');
        }));
    });
});
//# sourceMappingURL=auth.test.js.map