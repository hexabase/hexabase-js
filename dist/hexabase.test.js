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
const index_1 = require("./index");
const workspace_1 = __importDefault(require("./lib/packages/workspace"));
require('dotenv').config();
jest.useRealTimers();
const email = process.env.STAG_EMAIL || '';
const password = process.env.STAG_PASSWORD || '';
const token = process.env.PROD_TOKEN || '';
const client = new index_1.HexabaseClient({ env: 'dev' });
describe('Hexabase', () => {
    describe('#createClient()', () => {
        it('get createClient and testing with url, email, password', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers();
            yield client.login({ email, password, token });
            expect(client.currentWorkspace instanceof workspace_1.default).toBe(true);
        }));
    });
    describe('#createClient()', () => {
        it('get createClient and testing with url and token', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers();
            yield client.login({ token });
            expect(client.currentWorkspace instanceof workspace_1.default).toBe(true);
        }));
    });
    describe('#createClient()', () => {
        it('get createClient and testing with email, password', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers();
            yield client.login({ email, password });
            expect(client.currentWorkspace instanceof workspace_1.default).toBe(true);
        }));
    });
});
//# sourceMappingURL=hexabase.test.js.map