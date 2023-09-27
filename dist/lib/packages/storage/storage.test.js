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
require('dotenv').config();
let tokenStr = process.env.TOKEN || '';
const fileID = process.env.FILE_ID || '';
const url = process.env.URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const datastoreId = process.env.DATASTOREID || '';
const projectId = process.env.APPLICATIONID || '';
const itemId = process.env.ITEMID || '';
const fieldId = process.env.FIELDID || '';
const content = process.env.CONTENTFILE || '';
const contentTypeFile = process.env.CONTENTTYPEFILE || '';
const nameFile = process.env.NAMEFILE || '';
const payload = {
    contentTypeFile: contentTypeFile,
    filename: nameFile,
    filepath: `${datastoreId}/${itemId}/${fieldId}/${nameFile}`,
    d_id: datastoreId,
    p_id: projectId,
    item_id: itemId,
    display_order: 0,
    field_id: fieldId,
    content: content
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (email && password) {
        console.log('[email, password]: ', email, password);
        const auth = new auth_1.default(url);
        const { token, error } = yield auth.login({ email, password });
        if (token) {
            return tokenStr = token;
        }
        else {
            throw Error(`Need login fail to initialize sdk: ${error}`);
        }
    }
}));
describe('User', () => {
    describe('#createFile()', () => {
        it('should get download file without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const storage = new _1.default(url, tokenStr);
            const { data, error } = yield storage.createFile(payload);
            if (data && data.file_id) {
                console.log('data.file_id', data.file_id);
                expect(typeof data.file_id).toBe('string');
            }
            else {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#getFile()', () => {
        it('should get download file without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const storage = new _1.default(url, tokenStr);
            const { file, error } = yield storage.getFile(fileID);
            if (file) {
                expect(typeof file.data).toBe('string');
            }
            else {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
    describe('#delete()', () => {
        it('should delete file without error', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            const storage = new _1.default(url, tokenStr);
            const { data, error } = yield storage.delete(fileID);
            if (data) {
                expect(typeof data).toBe('object');
            }
            else {
                throw new Error(`Error: ${error}`);
            }
        }));
    });
});
//# sourceMappingURL=storage.test.js.map