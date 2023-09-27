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
const datastore_1 = require("../../graphql/datastore");
const field_1 = __importDefault(require("../field"));
const action_1 = __importDefault(require("../action"));
const status_1 = __importDefault(require("../status"));
const item_1 = __importDefault(require("../item"));
const DEFAULT_TEXTAREA_LENGTH = 2000;
class Datastore extends HxbAbstract_1.HxbAbstract {
    constructor(params) {
        var _a;
        super(params);
        this.templateName = 'SEED1';
        this._fields = [];
        this.extendLimitEextareaLength = DEFAULT_TEXTAREA_LENGTH;
        this.ignoreSaveTemplate = false;
        this.showDisplayIdToList = false;
        this.showInMenu = true;
        this.showInfoToList = false;
        this.showOnlyDevMode = false;
        this.useBoardView = false;
        this.useCsvUpdate = false;
        this.useExternalSync = false;
        this.useGridView = false;
        this.useGridViewByDefault = false;
        this.useWrDownload = false;
        this.useReplaceUpload = false;
        this.useStatusUpdate = false;
        this.useStatusUpdateByDefault = false;
        this.displayOrder = 0;
        this.externalServiceUrl = '';
        this.dataSource = '';
        this._actions = [];
        if (this.project) {
            this.language = (_a = this.project.workspace.languages) === null || _a === void 0 ? void 0 : _a.find(language => language.default);
        }
    }
    static all({ project }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield Datastore.request(datastore_1.GET_DATASTORES, {
                projectId: project.id,
            });
            return res.datastores.map(params => Datastore.fromJson(Object.assign({ project }, params)));
        });
    }
    createItemId() {
        return __awaiter(this, void 0, void 0, function* () {
            return item_1.default.createItemId(this);
        });
    }
    set(key, value) {
        switch (key) {
            case 'id':
            case 'd_id':
            case 'datastore_id':
                if (value && value.trim() !== '')
                    this.id = value;
                break;
            case 'project':
                this.project = value;
                break;
            case 'name':
                this.name = value;
                break;
            case 'display_id':
                this.displayId = value;
                break;
            case 'dipaly_order':
                this.displayOrder = value;
                break;
            case 'data_source':
                this.dataSource = value;
                break;
            case 'deleted':
                this.deleted = value;
                break;
            case 'external_service_data':
                this.externalServiceData = value;
                break;
            case 'imported':
                this.imported = value;
                break;
            case 'invisible':
                this.invisible = value;
                break;
            case 'is_external_service':
                this.isExternalService = value;
                break;
            case 'no_status':
                this.noStatus = value;
                break;
            case 'show_display_id_to_list':
                this.showDisplayIdToList = value;
                break;
            case 'show_in_menu':
                this.showInMenu = value;
                break;
            case 'show_info_to_list':
                this.showInfoToList = value;
                break;
            case 'show_only_dev_mode':
                this.showOnlyDevMode = value;
                break;
            case 'unread':
                this.unread = value;
                break;
            case 'uploading':
                this.uploading = value;
                break;
            case 'use_board_view':
                this.useBoardView = value;
                break;
            case 'use_csv_update':
                this.useCsvUpdate = value;
                break;
            case 'use_external_sync':
                this.useExternalSync = value;
                break;
            case 'use_grid_view':
                this.useGridView = value;
                break;
            case 'use_grid_view_by_default':
                this.useGridViewByDefault = value;
                break;
            case 'use_qr_download':
                this.useQrDownload = value;
                break;
            case 'use_replace_upload':
                this.useReplaceUpload = value;
                break;
        }
        return this;
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            promises.push(this.request(datastore_1.GET_DATASTORE_DETAIL, { datastoreId: this.id }));
            promises.push(this.fields());
            const ary = yield Promise.all(promises);
            const res = ary[0];
            this.sets(res.datastoreSetting);
            return true;
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id) {
                return this.update();
            }
            else {
                return this.create();
            }
        });
    }
    create() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Datastore.client.currentUser;
            const payload = {
                lang_cd: ((_a = this.language) === null || _a === void 0 ? void 0 : _a.langCd) || 'en',
                project_id: this.project.id,
                template_name: this.templateName,
                workspace_id: this.project.workspace.id,
                user_id: user.id,
            };
            const res = yield this.request(datastore_1.CREATE_DATASTORE_FROM_TEMPLATE, { payload });
            this.id = (_b = res === null || res === void 0 ? void 0 : res.createDatastoreFromTemplate) === null || _b === void 0 ? void 0 : _b.datastoreId;
            return true;
        });
    }
    validateDisplayId(displayId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                displayId,
                datastoreId: this.id,
                projectId: this.project.id,
            };
            const res = yield this.request(datastore_1.VALIDATE_DS_DISPLAY_ID, { payload });
            return res.validateDatastoreDisplayID.exits;
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                datastore_id: this.id,
                display_id: this.displayId,
                extend_limit_textarea_length: this.extendLimitEextareaLength,
                ignore_save_template: this.ignoreSaveTemplate,
                is_extend_limit_textarea: this.extendLimitEextareaLength !== DEFAULT_TEXTAREA_LENGTH,
                name: this.name,
                show_display_id_to_list: this.showDisplayIdToList,
                show_in_menu: this.showInMenu,
                show_info_to_list: this.showInfoToList,
                show_only_dev_mode: this.showOnlyDevMode,
                use_board_view: this.useBoardView,
                use_csv_update: this.useCsvUpdate,
                use_external_sync: this.useExternalSync,
                use_grid_view: this.useGridView,
                use_grid_view_by_default: this.useGridViewByDefault,
                use_qr_download: this.useWrDownload,
                use_replace_upload: this.useReplaceUpload,
                use_status_update: this.useStatusUpdate,
            };
            const resUpdate = yield this.request(datastore_1.UPDATE_DATASTORE_SETTING, { payload });
            return resUpdate.updateDatastoreSetting.success;
        });
    }
    fields() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._fields.length > 0)
                return this._fields;
            this._fields = yield field_1.default.all(this);
            return this._fields;
        });
    }
    field(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const field = this._fields.find(f => f.id === id || f.displayId === id);
            if (field)
                return field;
            const f = yield field_1.default.get(this, id);
            if (!this._fields.find(f => f.id === id || f.displayId === id)) {
                this._fields.push(f);
            }
            return f;
        });
    }
    fieldSync(id) {
        const field = this._fields.find(f => f.id === id || f.displayId === id);
        if (field)
            return field;
        throw new Error(`Field ${id} not found`);
    }
    actions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._actions.length > 0)
                return this._actions;
            const res = yield this.request(datastore_1.DS_ACTIONS, { datastoreId: this.id });
            this._actions = res.datastoreGetActions
                .map((action) => action_1.default.fromJson(Object.assign({ datastore: this }, action)));
            return this._actions;
        });
    }
    statuses() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(datastore_1.DS_STATUS, { datastoreId: this.id });
            return res.datastoreGetStatuses
                .map((status) => status_1.default.fromJson(Object.assign({ datastore: this }, status)));
        });
    }
    action(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            const actions = yield this.actions();
            return actions.find(a => a.operation === operation);
        });
    }
    autoNumber(fieldId, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                datastoreId: this.id,
                fieldId,
                projectId: this.project.id,
                getFieldAutoNumberQuery: params,
            };
            const res = yield this.request(datastore_1.DATASTORE_GET_FIELD_AUTO_NUMBER, payload);
            return res.datastoreGetFieldAutoNumber.result.number;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const resUpdate = yield this.request(datastore_1.DELETE_DATASTORE, { datastoreId: this.id });
            return resUpdate === null || resUpdate === void 0 ? void 0 : resUpdate.deleteDatastore.success;
        });
    }
    items(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { items } = yield this.itemsWithCount(params);
            return items;
        });
    }
    search() {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                datastore_id: this.id,
                project_id: this.project.id,
                page: 1,
                per_page: 100,
            };
            return item_1.default.search(payload, this);
        });
    }
    searchWithCount(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                datastore_id: this.id,
                project_id: this.project.id,
                page: options.page,
                per_page: options.per_page,
                return_count_only: true,
                conditions: options.conditions,
                use_or_condition: options.use_or_condition || false,
                unread_only: options.unread_only || false,
                sort_fields: options.sort_fields,
                sort_field_id: options.sort_field_id,
                sort_order: options.sort_order,
                use_field_id: options.use_field_id || false,
                use_display_id: true,
                include_links: options.include_links || true,
                include_lookups: options.include_lookups || true,
                return_number_value: options.return_number_value || true,
                format: 'map',
                include_fields_data: options.include_fields_data || true,
                omit_fields_data: options.omit_fields_data || false,
                omit_total_items: options.omit_total_items || false,
                data_result_timeout_sec: options.data_result_timeout_sec || 30,
                total_count_timeout_sec: options.total_count_timeout_sec || 30,
                debug_query: false,
                select_fields: options.select_fields,
                select_fields_lookup: options.select_fields_lookup,
            };
            return item_1.default.searchWithCount(payload, this);
        });
    }
    itemsWithCount(params = { page: 1, per_page: 10 }) {
        if (typeof params.page === 'undefined')
            params.page = 1;
        if (typeof params.per_page === 'undefined')
            params.per_page = 10;
        return item_1.default.all(params, this);
    }
    item(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = item_1.default.fromJson({ datastore: this, i_id: id });
            if (id)
                yield item.fetch();
            return item;
        });
    }
}
exports.default = Datastore;
//# sourceMappingURL=index.js.map