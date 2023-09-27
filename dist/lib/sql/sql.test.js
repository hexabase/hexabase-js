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
const __1 = require("../..");
require('dotenv').config();
jest.useRealTimers();
const token = process.env.TOKEN || '';
const hexabase = new __1.HexabaseClient({ env: 'dev' });
const url = process.env.URL || '';
const taskId = process.env.TASKID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const datastoreID = process.env.DEV_DATASOTRE_ID || '';
const projectID = process.env.DEV_PROJECT_ID || '';
const params = {
    page: 1,
    per_page: 0,
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield hexabase.login({ email, password, token });
    const project = yield hexabase.currentWorkspace.project(projectID);
    const datastore = yield project.datastore(datastoreID);
    for (let i = 0; i < 10; i++) {
        const item = yield datastore.item();
        yield item
            .set('textInputUnique', name())
            .set('number', i)
            .set('number2', i * i)
            .save();
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const query = hexabase.query(projectID);
    yield query
        .from(datastoreID)
        .delete();
}));
describe('Hexabase SQL', () => {
    it('Select all fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = hexabase.query(projectID);
        const res = yield query
            .from(datastoreID)
            .select('*');
        const project = yield hexabase.currentWorkspace.project(projectID);
        const datastore = yield project.datastore(datastoreID);
        const items = yield datastore.items({ per_page: 0, page: 1 });
        expect(res.length).toEqual(items.length);
        expect(res[0].fields.length).toEqual(items[0].fields.length);
    }));
    it('Select limited fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = hexabase.query(projectID);
        const res = yield query
            .from(datastoreID)
            .select('textInputUnique, autoNum');
        expect(Object.keys(res[0].fields).length).toEqual(2);
        const res2 = yield query
            .from(datastoreID)
            .select('textInputUnique, autoNum, calc');
        expect(Object.keys(res2[0].fields).length).toEqual(3);
    }));
    it('Change limit rows', () => __awaiter(void 0, void 0, void 0, function* () {
        const LIMIT = 5;
        const query = hexabase.query(projectID);
        const res = yield query
            .from(datastoreID)
            .limit(LIMIT)
            .select('*');
        expect(res.length).toEqual(LIMIT);
    }));
    it('Change page', () => __awaiter(void 0, void 0, void 0, function* () {
        const LIMIT = 5;
        const query = hexabase.query(projectID);
        const res = yield query
            .from(datastoreID)
            .limit(LIMIT)
            .select('*');
        expect(res.length).toEqual(LIMIT);
        const item = res[LIMIT - 3];
        const res2 = yield query
            .from(datastoreID)
            .limit(LIMIT - 3)
            .page(2)
            .select('*');
        expect(item.id !== '').toBeTruthy();
        expect(res2[0].id).toEqual(item.id);
    }));
    it('Where equalTo', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = hexabase.query(projectID);
        const c = query.condition;
        const res = yield query
            .from(datastoreID)
            .limit(6)
            .select('*');
        const item = res[5];
        const res2 = yield query
            .from(datastoreID)
            .where(c.equalTo('i_id', item.id))
            .limit(6)
            .select('*');
        expect(res2.length).toEqual(1);
        expect(res2[0].id).toEqual(item.id);
    }));
    it('Count', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = hexabase.query(projectID);
        const res = yield query
            .from(datastoreID)
            .limit(0)
            .select('*');
        const res2 = yield query
            .from(datastoreID)
            .limit(1)
            .count();
        expect(res.length).toEqual(res2);
    }));
    it('Insert one', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = hexabase.query(projectID);
        const randamString = Math.random().toString(36).substring(7);
        const textInputUnique = `${(new Date).toISOString()}-${randamString}`;
        const item = yield query
            .from(datastoreID)
            .insert({
            textInputUnique,
            number: 100,
            number2: 200,
        });
        expect(item.id !== '').toBeTruthy();
        expect(item.get('textInputUnique')).toEqual(textInputUnique);
    }));
    it('Insert multi', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = hexabase.query(projectID);
        const textInputUnique = name();
        const items = yield query
            .from(datastoreID)
            .insert([
            {
                textInputUnique: name(),
                number: 100,
                number2: 200,
            },
            {
                textInputUnique: textInputUnique,
                number: 100,
                number2: 200,
            },
            {
                textInputUnique: name(),
                number: 100,
                number2: 200,
            },
        ]);
        expect(items.length).toEqual(3);
        expect(items[1].id !== '').toBeTruthy();
        expect(items[1].get('textInputUnique')).toEqual(textInputUnique);
    }));
    it('Update one', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = hexabase.query(projectID);
        const NUMBER1 = 200;
        const NUMBER2 = 300;
        const randamString = Math.random().toString(36).substring(7);
        const textInputUnique = `${(new Date).toISOString()}-${randamString}`;
        const item = yield query
            .from(datastoreID)
            .insert({
            textInputUnique,
            number: 100,
            number2: 200,
        });
        const newName = name();
        const updatedItems = yield query
            .from(datastoreID)
            .where(query.condition.equalTo('i_id', item.id))
            .update({
            textInputUnique: newName,
            number: NUMBER1,
            number2: NUMBER2,
        });
        expect(item.id).toEqual(updatedItems[0].id);
        expect(updatedItems[0].get('textInputUnique')).toEqual(newName);
        expect(updatedItems[0].get('number')).toEqual(NUMBER1);
        expect(updatedItems[0].get('number2')).toEqual(NUMBER2);
    }));
    it('Update multiple', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = hexabase.query(projectID);
        const NUMBER1 = 510;
        const NUMBER2 = 610;
        const params = [1, 2, 3].map(count => {
            return {
                textInputUnique: name(),
                number: NUMBER1,
                number2: NUMBER2,
            };
        });
        yield query
            .from(datastoreID)
            .insert(params);
        const items = yield query
            .from(datastoreID)
            .where([
            query.condition.equalTo('number', NUMBER1),
            query.condition.equalTo('number2', NUMBER2)
        ])
            .select();
        expect(items.length).toEqual(3);
        yield query
            .from(datastoreID)
            .where([
            query.condition.equalTo('number', NUMBER1),
            query.condition.equalTo('number2', NUMBER2)
        ])
            .update({
            number: NUMBER1 + 10,
            number2: NUMBER2 + 10,
        });
        const updateItems = yield query
            .from(datastoreID)
            .where([
            query.condition.equalTo('number', NUMBER1 + 10),
            query.condition.equalTo('number2', NUMBER2 + 10)
        ])
            .select('*');
        expect(updateItems.length).toEqual(items.length);
        expect(updateItems[0].get('number')).toEqual(NUMBER1 + 10);
        for (const item of updateItems) {
            yield item.delete();
        }
    }));
    it('delete one', () => __awaiter(void 0, void 0, void 0, function* () {
        const query = hexabase.query(projectID);
        const NUMBER1 = 220;
        const NUMBER2 = 330;
        const randamString = Math.random().toString(36).substring(7);
        const textInputUnique = `${(new Date).toISOString()}-${randamString}`;
        yield query
            .from(datastoreID)
            .insert([
            {
                textInputUnique,
                number: NUMBER1,
                number2: NUMBER2,
            },
            {
                textInputUnique: name(),
                number: NUMBER1,
                number2: NUMBER2,
            },
            {
                textInputUnique: name(),
                number: NUMBER1 + 1,
                number2: NUMBER2,
            },
        ]);
        const res = yield query
            .from(datastoreID)
            .where(query.condition.equalTo('number', NUMBER1))
            .delete();
        expect(res).toEqual(true);
        const num = yield query
            .from(datastoreID)
            .where(query.condition.equalTo('number2', NUMBER2))
            .count();
        expect(num).toEqual(1);
    }));
});
const name = () => {
    const randamString = Math.random().toString(36).substring(7);
    const textInputUnique = `${(new Date).toISOString()}-${randamString}`;
    return textInputUnique;
};
//# sourceMappingURL=sql.test.js.map