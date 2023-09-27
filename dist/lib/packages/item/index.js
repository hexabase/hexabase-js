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
const HxbAbstract_1 = require("../../../HxbAbstract");
const item_1 = require("../../graphql/item");
const itemHistory_1 = __importDefault(require("../itemHistory"));
const itemAction_1 = __importDefault(require("../itemAction"));
const itemStatus_1 = __importDefault(require("../itemStatus"));
const statusAction_1 = __importDefault(require("../statusAction"));
const linkItem_1 = __importDefault(require("../linkItem"));
const fileObject_1 = __importDefault(require("../fileObject"));
const field_1 = require("../../../lib/types/field");
class Item extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this.fields = {};
        this.actions = [];
        this.statuses = [];
        this.statusActions = [];
        this._existAttachment = false;
        this._linkItems = [];
        this._unlinkItems = [];
        this._detail = false;
        this.ignoreFieldUpdate = false;
    }
    set(key, value) {
        switch (key) {
            case 'datastore':
                this.datastore = value;
                break;
            case 'd_id':
                break;
            case 'links': {
                const project = this.datastore.project;
                value.forEach(params => {
                    const datasstore = project.datastoreSync(params.d_id);
                    params.i_ids
                        .forEach(i_id => {
                        const linkedItem = Item.fromJson({ datastore: datasstore, i_id: i_id });
                        this._linkItems.push(new linkItem_1.default({ item: this, linkedItem, saved: true }));
                    });
                });
                break;
            }
            case 'item_links': {
                if (value.item_count === 0)
                    break;
                const project = this.datastore.project;
                value.links.forEach(params => {
                    const datastore = project.datastoreSync(params.d_id);
                    params.items.forEach(itemParams => {
                        const linkedItem = Item.fromJson({ datastore, i_id: itemParams.i_id });
                        this._linkItems.push(new linkItem_1.default({ item: this, linkedItem, saved: true }));
                    });
                });
                break;
            }
            case 'pinned':
                this.pinned = value;
                break;
            case 'a_id':
            case 'p_id':
                break;
            case 'created_at':
                this.createdAt = new Date(value);
                break;
            case 'updated_at':
                this.updatedAt = new Date(value);
                break;
            case 'rev_no':
                this.revNo = value;
                break;
            case 'unread':
                this.unread = value;
                break;
            case 'w_id':
                break;
            case 'i_id':
                if (value) {
                    this.id = value;
                }
                break;
            case 'seed_i_id':
                this.seedItemId = value;
                break;
            case 'Status':
                this.statusLabel = value;
                break;
            case 'status_id':
                this.statusId = value;
                break;
            case 'title':
                this.title = value;
                break;
            case 'created_by':
                this.createdBy = value;
                break;
            case 'updated_by':
                this.updatedBy = value;
                break;
            case 'lookup_items':
                break;
            case 'item_actions':
                this.actions = Object.keys(value)
                    .map((display_id) => itemAction_1.default
                    .fromJson(Object.assign(Object.assign({ display_id }, value[display_id]), { item: this })));
                break;
            case 'status_list':
                this.statuses = Object.keys(value)
                    .map((display_id) => itemStatus_1.default
                    .fromJson(Object.assign(Object.assign({ display_id }, value[display_id]), { item: this })));
                break;
            case 'status_actions':
                this.statusActions = Object.keys(value)
                    .map((display_id) => statusAction_1.default
                    .fromJson(Object.assign(Object.assign({ display_id }, value[display_id]), { item: this })));
                break;
            case 'status_order':
                this.statusOrder = value;
                break;
            case 'status_action_order':
                this.statusActionOrder = value;
                break;
            case 'item_action_order':
                this.itemActionOrder = value;
                break;
            case 'field_values':
                Object.keys(value).forEach(fieldName => {
                    const val = value[fieldName];
                    if (val.dataType === field_1.DataType.DSLOOKUP && val.value) {
                        const datastore = this.datastore.project.datastoreSync(val.value.d_id);
                        const params = val.value.lookup_item;
                        params.datastore = datastore;
                        const item = Item.fromJson(params);
                        this.fields[fieldName] = item;
                    }
                    else {
                        this.setFieldValue(fieldName, val.value);
                    }
                });
                break;
            default:
                this.setFieldValue(key, value);
                break;
        }
        return this;
    }
    add(fieldName, value) {
        if (Array.isArray(value))
            return this.addAll(fieldName, value);
        if (this.ignoreFieldUpdate)
            return this;
        const field = this.datastore.fieldSync(fieldName);
        if (!field.valid(value)) {
            throw new Error(`Invalid value ${value} for field key ${field.name}`);
        }
        if (this.fields[fieldName]) {
            this.fields[fieldName].push(field.value(value, { item: this })[0]);
        }
        else {
            this.fields[fieldName] = [field.value(value, { item: this })];
        }
        return this;
    }
    addAll(fieldName, values) {
        values.forEach(value => this.add(fieldName, value));
        return this;
    }
    setFieldValue(fieldName, value) {
        if (this.ignoreFieldUpdate)
            return this;
        const field = this.datastore.fieldSync(fieldName);
        if (!field.valid(value)) {
            throw new Error(`Invalid value ${value} for field key ${field.name}`);
        }
        value = field.value(value, { item: this });
        if (field.dataType.toLocaleLowerCase() === 'status') {
            this._status = value;
        }
        this.fields[field.displayId] = value;
        return this;
    }
    get(name, defaultValue) {
        const value = this.fields[name] && this.fields[name].field ? this.fields[name].value : this.fields[name];
        if (value === undefined || value === null && defaultValue) {
            return defaultValue;
        }
        if (!value)
            return undefined;
        return value;
    }
    static all(params, datastore) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                getItemsParameters: params,
                datastoreId: datastore.id,
                projectId: datastore.project.id,
            };
            payload.getItemsParameters.return_number_value = true;
            payload.getItemsParameters.include_links = true;
            payload.getItemsParameters.format = 'map';
            const res = yield Item.request(item_1.DS_ITEMS, payload);
            for (const item of res.datastoreGetDatastoreItems.items) {
                if (!item.item_links || !item.item_links.links || item.item_links.length === 0)
                    continue;
                for (const link of item.item_links.links) {
                    if (!link.d_id)
                        continue;
                    const d = yield datastore.project.datastore(link.d_id);
                    yield d.fields();
                }
            }
            const items = res.datastoreGetDatastoreItems.items
                .map((params) => Item.fromJson(Object.assign({ datastore }, params)));
            const totalCount = res.datastoreGetDatastoreItems.totalItems;
            return {
                totalCount, items,
            };
        });
    }
    static search(payload, datastore) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof payload.page === 'undefined')
                payload.page = 1;
            if (typeof payload.per_page === 'undefined')
                payload.per_page = 100;
            payload.include_lookups = true;
            payload.include_links = true;
            payload.return_number_value = true;
            payload.include_fields_data = true;
            payload.format = 'map';
            const res = yield this.request(item_1.ITEM_WITH_SEARCH, { payload });
            return res.itemWithSearch.items.map((params) => Item.fromJson(Object.assign({ datastore }, params)));
        });
    }
    static searchWithCount(payload, datastore) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof payload.page === 'undefined')
                payload.page = 1;
            if (typeof payload.per_page === 'undefined')
                payload.per_page = 100;
            payload.include_lookups = true;
            payload.include_links = true;
            payload.return_number_value = true;
            payload.include_fields_data = true;
            payload.format = 'map';
            payload.use_display_id = true;
            payload.datastore_id = datastore.id;
            payload.project_id = datastore.project.id;
            const res = yield this.request(item_1.ITEM_WITH_SEARCH, { payload });
            console.log(res);
            const items = res.itemWithSearch.items.map((params) => Item.fromJson(Object.assign({ datastore }, params)));
            const totalCount = res.itemWithSearch.totalItems;
            return {
                totalCount, items,
            };
        });
    }
    static createItemId(datastore) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(item_1.CREATE_ITEMID, { datastoreId: datastore.id });
            return res.datastoreCreateItemID.item_id;
        });
    }
    static delete(conditions, datasstore) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                projectId: datasstore.project.id,
                datastoreId: datasstore.id,
                deleteItemsParameters: {
                    use_display_id: true,
                    conditions,
                }
            };
            const res = yield this.request(item_1.DELETE_ITEMS, params);
            return res.datastoreDeleteDatastoreItems.success;
        });
    }
    save(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (!this.id ? this.create() : this.update(comment));
            yield this.fetch();
            yield Promise.all(this._linkItems.map(linkItem => linkItem.create()));
            yield Promise.all(this._unlinkItems.map(linkItem => linkItem.delete()));
            this._linkItems = [];
            this._unlinkItems = [];
            return true;
        });
    }
    link(item) {
        this._linkItems.push(new linkItem_1.default({ item: this, linkedItem: item }));
        return this;
    }
    unlink(item) {
        this._unlinkItems.push(new linkItem_1.default({ item: this, linkedItem: item }));
        return this;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.datastore)
                throw new Error('Datastore is required');
            const payload = {
                return_item_result: true,
                is_notify_to_sender: true,
                ensure_transaction: false,
                exec_children_post_procs: true,
                item: yield this.toJson(),
            };
            const res = yield this.request(item_1.CREATE_NEW_ITEM, {
                projectId: this.datastore.project.id,
                datastoreId: this.datastore.id,
                payload,
            });
            if (this.datastore._fields.length === 0)
                yield this.datastore.fields();
            const params = {};
            Object.keys(res.datastoreCreateNewItem.item).forEach((id) => {
                const field = this.datastore._fields.find((f) => f.id === id || f.displayId === id);
                if (!field) {
                    params[id] = res.datastoreCreateNewItem.item[id];
                }
                else {
                    params[field.displayId] = res.datastoreCreateNewItem.item[id];
                }
            });
            for (const key in params) {
                if (!params[key].d_id)
                    continue;
                const datastore = this.datastore.project.datastoreSync(params[key].d_id);
                if (datastore) {
                    params[key] = yield datastore.item(params[key].item_id);
                }
            }
            this.sets(params);
            this._setStatus(this._status);
            if (this._existAttachment) {
                yield this.update();
                this._existAttachment = false;
            }
            return true;
        });
    }
    execute(actionName) {
        return __awaiter(this, void 0, void 0, function* () {
            const action = yield this.action(actionName);
            if (!action)
                throw new Error(`Action ${actionName} not found`);
            const params = {
                rev_no: this.revNo,
                datastore_id: this.datastore.id,
                action_id: action.id,
                is_notify_to_sender: true,
                ensure_transaction: true,
                exec_children_post_procs: true,
                return_item_result: true,
                item: yield this.toJson(),
            };
            const res = yield this.request(item_1.EXECUTE_ITEM_ACTION, {
                actionId: action.id,
                datastoreId: this.datastore.id,
                itemId: this.id,
                projectId: this.datastore.project.id,
                itemActionParameters: params
            });
            this.sets(res.datastoreExecuteItemAction.item);
            this._setStatus(this._status);
            return true;
        });
    }
    update(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const action = yield this.action('UpdateItem');
            const params = {
                rev_no: this.revNo,
                datastore_id: this.datastore.id,
                action_id: action && action.id,
                is_notify_to_sender: true,
                ensure_transaction: true,
                exec_children_post_procs: true,
                return_item_result: true,
                item: yield this.toJson(),
            };
            if (comment) {
                params.history = {
                    comment,
                    datastore_id: this.datastore.id,
                };
            }
            const res = yield this.request(item_1.DATASTORE_UPDATE_ITEM, {
                datastoreId: this.datastore.id,
                itemId: this.id,
                projectId: this.datastore.project.id,
                itemActionParameters: params
            });
            this.sets(res.datastoreUpdateItem.item);
            this._setStatus(this._status);
            return true;
        });
    }
    toJson() {
        return __awaiter(this, void 0, void 0, function* () {
            const json = {};
            for (const key in this.fields) {
                const field = this.datastore.fieldSync(key);
                if (!field)
                    throw new Error(`Field ${key} is not found`);
                if (!this.id && field.dataType === field_1.DataType.FILE && this.fields[key] && this.fields[key].length > 0) {
                    const files = this.fields[key];
                    const file = files.find(f => !f.id);
                    if (file) {
                        this._existAttachment = true;
                        continue;
                    }
                }
                const value = yield field.convert(this.fields[key]);
                if (typeof value !== 'undefined' && this.fields[key]) {
                    json[key] = value;
                }
            }
            return json;
        });
    }
    status(status) {
        if (status) {
            const statusAction = this.statusActions.find(action => action.displayId === status);
            if (!statusAction)
                throw new Error('Status action is not found');
            this._updateStatusAction = statusAction;
            const newStatus = this.statuses.find(s => s.id === statusAction.nextStatusId);
            if (!newStatus)
                throw new Error(`Status is not found ${statusAction.nextStatusId}`);
            this._setStatus(newStatus);
        }
        return this._status.displayId;
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                datastoreId: this.datastore.id,
                itemId: this.id,
                projectId: this.datastore.project.id,
                datastoreItemDetailParams: {
                    include_lookups: true,
                    use_display_id: true,
                    return_number_value: true,
                    format: 'map',
                    include_linked_items: true,
                },
            };
            const res = yield this.request(item_1.ITEM_DETAIL, params);
            for (const key in res.getDatastoreItemDetails.field_values) {
                const field = res.getDatastoreItemDetails.field_values[key];
                if (field.dataType !== 'dslookup' || !field.value)
                    continue;
                yield this.datastore.project.datastore(field.value.d_id);
            }
            this.sets(res.getDatastoreItemDetails);
            this._setStatus(this._status);
            return true;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const action = yield this.action('DeleteItem');
            const params = {
                a_id: action.id,
            };
            const res = yield this.request(item_1.DELETE_ITEM, {
                datastoreId: this.datastore.id,
                itemId: this.id,
                projectId: this.datastore.project.id,
                deleteItemReq: params,
            });
            return !res.datastoreDeleteItem.error;
        });
    }
    action(actionName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.actions.length === 0) {
                this.ignoreFieldUpdate = true;
                yield this.fetch();
                this.ignoreFieldUpdate = false;
            }
            return this.actions.find(a => a.displayId.trim().toLowerCase() === actionName.trim().toLocaleLowerCase());
        });
    }
    comment() {
        return new itemHistory_1.default({ item: this });
    }
    _setStatus(status) {
        if (this.statuses.length === 0)
            return;
        if (typeof status === 'string') {
            const statusName = Object.keys(this.fields).find(fieldName => this.datastore.fieldSync(fieldName).dataType === 'status');
            if (statusName) {
                this._status = this.statuses.find(status => status.id === this.fields[statusName]);
            }
            delete this.fields[statusName];
        }
        else {
            this._status = status;
        }
    }
    histories(getHistoryParamQueries) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.historiesWithUnread();
            return res.histories;
        });
    }
    historiesWithUnread(getHistoryParamQueries) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                projectId: this.datastore.project.id,
                datastoreId: this.datastore.id,
                itemId: this.id,
                getHistoryParamQueries,
            };
            const res = yield this.request(item_1.ITEM_HISTORIES, params);
            const histories = res.getHistories.histories
                .map((history) => itemHistory_1.default.fromJson(Object.assign({ item: this }, history)));
            return {
                unread: res.getHistories.unread,
                histories,
            };
        });
    }
    links(linkedDatastore) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(item_1.ITEM_LINKED, {
                datastoreId: this.datastore.id,
                itemId: this.id,
                linkedDatastoreId: typeof linkedDatastore === 'string' ? linkedDatastore : linkedDatastore.id,
            });
            if (res.datastoreGetLinkedItems.items.length === 0)
                return [];
            const projects = yield Item.client.currentWorkspace.projects();
            const items = [];
            for (const params of res.datastoreGetLinkedItems.items) {
                const project = projects.find(p => p.id === params.p_id);
                const datastore = typeof linkedDatastore === 'string' ? yield project.datastore(params.d_id) : linkedDatastore;
                items.push(yield datastore.item(params.i_id));
            }
            yield Promise.all(items.map((item) => item.fetch()));
            return items;
        });
    }
    file() {
        return new fileObject_1.default({ item: this });
    }
}
exports.default = Item;
//# sourceMappingURL=index.js.map