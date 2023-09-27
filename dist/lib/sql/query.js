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
const HxbAbstract_1 = require("../../HxbAbstract");
const item_1 = __importDefault(require("../packages/item"));
const project_1 = __importDefault(require("../packages/project"));
class Query extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this.conditions = {};
        this.query = {
            page: 1,
            per_page: 0,
        };
        this.useDisplayId = true;
    }
    set(key, value) {
        switch (key) {
            case 'queryClient':
                this.queryClient = value;
                break;
        }
        return this;
    }
    select(columns) {
        return __awaiter(this, void 0, void 0, function* () {
            if (columns !== '*') {
                if (typeof columns === 'string') {
                    this.query.select_fields = (columns !== null && columns !== void 0 ? columns : '*').split(',').map((column) => column.trim());
                }
                else if (Array.isArray(columns)) {
                    this.query.select_fields = columns;
                }
            }
            const { items } = yield this._execute();
            return items;
        });
    }
    where(conditions) {
        if (!Array.isArray(conditions)) {
            conditions = [conditions];
        }
        this.query.conditions = [...conditions];
        return this;
    }
    order(values) {
        const sortFields = [];
        const entries = Object.entries(values);
        entries.map(([key, val]) => {
            sortFields.push({ id: key, order: val });
        });
        this.query.sort_fields = sortFields;
        return this;
    }
    limit(value) {
        this.query.per_page = value;
        return this;
    }
    offset(value) {
        this.query.page = value;
        return this;
    }
    perPage(value) {
        this.query.per_page = value;
        return this;
    }
    page(value) {
        this.query.page = value;
        return this;
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            const { totalCount } = yield this._execute({ return_count_only: true });
            return totalCount;
        });
    }
    _execute(options = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield ((_a = Query.client.currentWorkspace) === null || _a === void 0 ? void 0 : _a.project(this.queryClient.projectId));
            const datastore = yield (project === null || project === void 0 ? void 0 : project.datastore(this.queryClient.datastoreId));
            const payload = this._baseParams();
            if (this.query.conditions) {
                payload.conditions = this.query.conditions;
            }
            if (this.query.select_fields) {
                payload.select_fields = this.query.select_fields;
            }
            return item_1.default.searchWithCount(payload, datastore);
        });
    }
    _baseParams() {
        return {
            page: this.query.page,
            per_page: this.query.per_page,
            datastore_id: this.queryClient.datastoreId,
            project_id: this.queryClient.projectId,
        };
    }
    insert(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(params)) {
                return Promise.all(params.map((param) => this._insert(param)));
            }
            return this._insert(params);
        });
    }
    _insert(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = new project_1.default({ id: this.queryClient.projectId });
            const datastore = yield project.datastore(this.queryClient.datastoreId);
            const item = yield datastore.item();
            return new Promise((resolve, reject) => {
                item.sets(params);
                item.save()
                    .then(() => resolve(item))
                    .catch(reject);
            });
        });
    }
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            this.limit(0).page(1);
            const items = yield this.select();
            return yield Promise.all(items.map(item => this._update(item, params)));
        });
    }
    _update(item, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                item.sets(params);
                item.save()
                    .then(() => resolve(item))
                    .catch(reject);
            }));
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            this.limit(0).page(1);
            const items = yield this.select();
            yield Promise.all(items.map(item => item.delete()));
            return true;
        });
    }
}
exports.default = Query;
//# sourceMappingURL=query.js.map