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
const buffer_1 = require("buffer");
const token = process.env.TOKEN || '';
const client = new HexabaseClient_1.default({ env: 'dev' });
const workspaceId = process.env.DEV_WORKSPACE_ID;
const datastoreId = process.env.DEV_DATASOTRE_ID || '';
const linkedDatastoreId = process.env.DEV_RELATED_DATASOTRE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const allFieldItemId = process.env.DEV_ALL_FIELD_ITEM_ID || '';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.login({ email, password, token });
}));
const TEXT_FIELD = 'test_text';
const NUMBER_FIELD = 'test_number';
const DATE_FIELD = 'test_datetime';
const CHECKBOX_FIELD = 'test_checkbox';
const RADIO_FIELD = 'test_radio';
const USER_FIELD = 'test_users';
const ITEM_FIELD = 'test_dslookup';
const FILE_FIELD = 'test_file';
describe('Item', () => {
    describe('#set()', () => {
        it('should set text to item', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item(allFieldItemId);
            console.log(item.fields);
        }));
        it('should set text to item', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            const message = 'Hello';
            item.set(TEXT_FIELD, message);
            expect(item.get(TEXT_FIELD)).toBe(message);
            try {
                item.set(TEXT_FIELD, 100);
            }
            catch (e) {
                expect(e instanceof Error).toBe(true);
            }
            try {
                item.set(TEXT_FIELD, new Date);
            }
            catch (e) {
                expect(e instanceof Error).toBe(true);
            }
            try {
                item.set(TEXT_FIELD, ['a']);
            }
            catch (e) {
                expect(e instanceof Error).toBe(true);
            }
        }));
        it('should set number to item', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            const message = 100;
            item.set(NUMBER_FIELD, message);
            expect(item.get(NUMBER_FIELD)).toBe(message);
            item.set(NUMBER_FIELD, 0);
            expect(item.get(NUMBER_FIELD)).toBe(0);
            try {
                item.set(NUMBER_FIELD, '100');
                expect(false).toBe(true);
            }
            catch (e) {
                expect(e instanceof Error).toBe(true);
            }
            try {
                item.set(NUMBER_FIELD, new Date);
                expect(false).toBe(true);
            }
            catch (e) {
                expect(e instanceof Error).toBe(true);
            }
            try {
                item.set(NUMBER_FIELD, ['0']);
                expect(false).toBe(true);
            }
            catch (e) {
                expect(e instanceof Error).toBe(true);
            }
        }));
        it('should set date to item', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            const message = new Date;
            item.set(DATE_FIELD, message);
            expect(item.get(DATE_FIELD)).toBe(message);
            const invalidNumber = 100;
            try {
                item.set(DATE_FIELD, `${invalidNumber}`);
            }
            catch (e) {
                expect(e.message).toBe(`Invalid value ${invalidNumber} for field key ${DATE_FIELD}`);
            }
            try {
                item.set(DATE_FIELD, invalidNumber);
            }
            catch (e) {
                expect(e.message).toBe(`Invalid value ${invalidNumber} for field key ${DATE_FIELD}`);
            }
            try {
                item.set(DATE_FIELD, ['0']);
            }
            catch (e) {
                expect(e instanceof Error).toBe(true);
            }
            expect(item.get(DATE_FIELD)).toBe(message);
            expect(item.get(DATE_FIELD) instanceof Date).toBe(true);
        }));
        it('should set checkbox to item', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            const options = yield datastore.fieldSync(CHECKBOX_FIELD).options();
            const newOptions = [options[0].value.en, options[1].value.ja];
            item.set(CHECKBOX_FIELD, newOptions);
            expect(item.get(CHECKBOX_FIELD)).toEqual([options[0].value, options[1].value]);
            const NO_VALUE = 'NO_VALUE';
            try {
                item.set(CHECKBOX_FIELD, [NO_VALUE]);
                expect(false).toBe(true);
            }
            catch (e) {
                expect(e.message).toBe(`Invalid value ${NO_VALUE} for field key ${CHECKBOX_FIELD}`);
            }
            expect(item.get(CHECKBOX_FIELD)).toEqual([options[0].value, options[1].value]);
        }));
        it('should set radio to item', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            const options = yield datastore.fieldSync(RADIO_FIELD).options();
            const newOptions = options[1].value.ja;
            item.set(RADIO_FIELD, newOptions);
            expect(item.get(RADIO_FIELD)).toEqual(options[1].value);
            const NO_VALUE = 'NO_VALUE';
            try {
                item.set(RADIO_FIELD, NO_VALUE);
                expect(false).toBe(true);
            }
            catch (e) {
                expect(e.message).toBe(`Invalid value ${NO_VALUE} for field key ${RADIO_FIELD}`);
            }
            expect(item.get(RADIO_FIELD)).toEqual(options[1].value);
        }));
        it('should set user to item', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.useFakeTimers('legacy');
            yield client.setWorkspace(workspaceId);
            const project = yield client.currentWorkspace.project(projectId);
            const datastore = yield project.datastore(datastoreId);
            const item = yield datastore.item();
            item.set(USER_FIELD, [client.currentUser]);
            expect(item.get(USER_FIELD)).toEqual([client.currentUser]);
            item.set(USER_FIELD, null);
            expect(item.get(USER_FIELD)).toEqual(null);
            item.set(USER_FIELD, [client.currentUser]);
            const NO_VALUE = 'NO_VALUE';
            try {
                item.set(USER_FIELD, NO_VALUE);
                expect(false).toBe(true);
            }
            catch (e) {
                expect(e.message).toBe(`Invalid value ${NO_VALUE} for field key ${USER_FIELD}`);
            }
            expect(item.get(USER_FIELD) !== null).toBe(true);
            expect(item.get(USER_FIELD)).toEqual([client.currentUser]);
        }));
    });
    it('should set item to item', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.useFakeTimers('legacy');
        yield client.setWorkspace(workspaceId);
        const project = yield client.currentWorkspace.project(projectId);
        const datastore = yield project.datastore(datastoreId);
        const item = yield datastore.item();
        const field = yield datastore.field(ITEM_FIELD);
        const refItem = yield field.datastore.item();
        refItem.set('Title', 'test');
        yield refItem.save();
        item.set(ITEM_FIELD, null);
        expect(item.get(ITEM_FIELD)).toEqual(null);
        item.set(ITEM_FIELD, refItem);
        expect(item.get(ITEM_FIELD)).toEqual(refItem);
        const NO_VALUE = 'NO_VALUE';
        try {
            item.set(ITEM_FIELD, NO_VALUE);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(e.message).toBe(`Invalid value ${NO_VALUE} for field key ${ITEM_FIELD}`);
        }
        expect(item.get(ITEM_FIELD) !== null).toBe(true);
        expect(item.get(ITEM_FIELD)).toEqual(refItem);
        yield refItem.delete();
    }));
    it('should set file to item', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.useFakeTimers('legacy');
        yield client.setWorkspace(workspaceId);
        const project = yield client.currentWorkspace.project(projectId);
        const datastore = yield project.datastore(datastoreId);
        const item = yield datastore.item();
        const field = yield datastore.field(ITEM_FIELD);
        item.set(FILE_FIELD, null);
        expect(item.get(FILE_FIELD)).toEqual(null);
        const file = item.file();
        const data = new buffer_1.Blob(['test'], { type: 'text/plain' });
        file
            .set('data', data)
            .set('name', 'test.txt');
        item.set(FILE_FIELD, [file]);
        expect(item.get(FILE_FIELD)).toEqual([file]);
        const NO_VALUE = 'NO_VALUE';
        try {
            item.set(FILE_FIELD, NO_VALUE);
            expect(false).toBe(true);
        }
        catch (e) {
            expect(e.message).toBe(`Invalid value ${NO_VALUE} for field key ${FILE_FIELD}`);
        }
        expect(item.get(FILE_FIELD) !== null).toBe(true);
        expect(item.get(FILE_FIELD)).toEqual([file]);
    }));
});
//# sourceMappingURL=field.test.js.map