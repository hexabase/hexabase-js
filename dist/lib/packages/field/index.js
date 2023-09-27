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
const datastore_1 = __importDefault(require("../datastore"));
const fieldLayout_1 = __importDefault(require("../fieldLayout"));
const datastore_2 = require("../../graphql/datastore");
const userRole_1 = __importDefault(require("../userRole"));
const project_1 = __importDefault(require("../project"));
const item_1 = __importDefault(require("../item"));
const fileObject_1 = __importDefault(require("../fileObject"));
const fieldOption_1 = __importDefault(require("../fieldOption"));
const user_1 = __importDefault(require("../user"));
const field_1 = require("../../../lib/types/field");
class Field extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this.roles = [];
        this._options = [];
    }
    set(key, value) {
        switch (key) {
            case 'datastore':
                this.datastore = value;
                break;
            case 'field_id':
                this.id = value;
                break;
            case 'field_name':
            case 'name':
                this.name = value;
                break;
            case 'display_id':
                this.displayId = value;
                break;
            case 'data_type':
            case 'dataType':
                this.dataType = value;
                break;
            case 'search':
                this.search = value;
                break;
            case 'show_list':
                this.showList = value;
                break;
            case 'as_title':
                this.asTitle = value;
                break;
            case 'status':
                this.status = value;
                break;
            case 'fieldIndex':
                this.fieldIndex = value;
                break;
            case 'title_order':
                this.titleOrder = value;
                break;
            case 'full_text':
                this.fullText = value;
                break;
            case 'unique':
                this.unique = value;
                break;
            case 'hide_from_api':
                this.hideFromApi = value;
                break;
            case 'has_index':
                this.hasIndex = value;
                break;
            case 'min_value':
                this.minValue = value;
                break;
            case 'max_value':
                this.maxValue = value;
                break;
            case 'hideOnInput':
                this.hideOnInput = value;
                break;
            case 'sizeX':
                this.sizeX = value;
                break;
            case 'sizeY':
                this.sizeY = value;
                break;
            case 'col':
                this.col = value;
                break;
            case 'row':
                this.row = value;
                break;
            case 'roles':
                this.roles = value
                    .map(role => userRole_1.default.fromJson(Object.assign({ project: this.datastore.project }, role)));
                break;
        }
        return this;
    }
    static all(datastore) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                projectId: datastore.project.id,
                datastoreId: datastore.id,
            };
            const res = yield this.request(datastore_2.DS_FIELDS, params);
            const data = res.datastoreGetFields;
            const fields = Object.keys(data.fields).map(id => Field.fromJson(Object.assign({ datastore }, data.fields[id])));
            Object.keys(data.field_layout).forEach((key) => {
                const field = fields.find(f => f.id === key);
                const fieldLayout = fieldLayout_1.default.fromJson(Object.assign({ field }, data.field_layout[key]));
                field.layout = fieldLayout;
            });
            yield Promise.all(fields.map(field => field.options()));
            return fields;
        });
    }
    valid(value) {
        if (value === null)
            return true;
        switch (this.dataType.toLocaleLowerCase()) {
            case field_1.DataType.TEXT:
            case field_1.DataType.TEXTAREA:
                return typeof value === 'string';
            case field_1.DataType.NUMBER:
                return typeof value === 'number';
            case field_1.DataType.FILE:
                if (value === '')
                    return true;
                if (value instanceof fileObject_1.default)
                    return true;
                if (typeof value === 'string')
                    return true;
                if (Array.isArray(value))
                    return true;
                return false;
            case field_1.DataType.DATETIME:
                if (typeof value === 'string' && value.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z/)) {
                    return true;
                }
                return value instanceof Date;
            case field_1.DataType.SELECT:
            case field_1.DataType.RADIO:
                if (typeof value !== 'string')
                    return false;
                return !!this._findOption(value);
            case field_1.DataType.CHECKBOX:
                if (typeof value === 'string') {
                    value = value.split(',');
                }
                return value
                    .every((v) => this._findOption(v));
            case field_1.DataType.USERS:
                if (typeof value === 'string') {
                    value = value.split(',');
                }
                return value
                    .every(v => v instanceof user_1.default || (v.email && v.user_id) || typeof v === 'string');
            case field_1.DataType.DSLOOKUP:
                if (value === null)
                    return true;
                if (value instanceof item_1.default)
                    return true;
                if (typeof value === 'string')
                    return true;
                if (typeof value !== 'object')
                    return false;
                if (value.item_id && value.title)
                    return true;
            case field_1.DataType.AUTONUM:
            case field_1.DataType.CALC:
            case field_1.DataType.LABEL:
            case field_1.DataType.SEPARATOR:
            case field_1.DataType.STATUS:
            default:
        }
        return true;
    }
    _findOption(value) {
        if (value === null)
            return undefined;
        if (typeof value === 'string') {
            return this._options.find(o => o.displayId === value || o.value.en === value || o.value.ja === value);
        }
        else {
            return this._options.find(o => o.value === value);
        }
    }
    value(value, options) {
        if (value === null)
            return null;
        switch (this.dataType.toLocaleLowerCase()) {
            case field_1.DataType.DSLOOKUP:
                if (typeof value === 'string') {
                    return value;
                }
                return this._valueDsLookup(value, options);
            case field_1.DataType.FILE:
                if (value === '')
                    return value;
                if (value instanceof fileObject_1.default)
                    return [value];
                if (!Array.isArray(value) && typeof value === 'string') {
                    value = value.split(',');
                }
                return value.map((file) => {
                    if (file instanceof fileObject_1.default)
                        return file;
                    if (typeof file === 'object')
                        return fileObject_1.default.fromJson(file);
                    if (file.match(/^[a-zA-Z0-9]+$/))
                        return new fileObject_1.default({ id: file });
                });
            case field_1.DataType.DATETIME:
                if (value instanceof Date)
                    return value;
                return new Date(value);
            case field_1.DataType.CHECKBOX:
                if (!Array.isArray(value)) {
                    value = [value];
                }
                return value.map((v) => {
                    const option = this._findOption(v);
                    return option ? option.value : null;
                });
            case field_1.DataType.SELECT:
            case field_1.DataType.RADIO:
                const option = this._findOption(value);
                return option ? option.value : null;
            case field_1.DataType.USERS:
                if (!Array.isArray(value)) {
                    value = [value];
                }
                return value
                    .map((params) => (params instanceof user_1.default) ? params : user_1.default.fromJson(params));
            case field_1.DataType.FILE:
                if (!Array.isArray(value)) {
                    value = [value];
                }
                return value
                    .map((params) => fileObject_1.default.fromJson(params));
            default:
        }
        return value;
    }
    _valueDsLookup(value, options) {
        if (value instanceof item_1.default)
            return value;
        const project = new project_1.default({ workspace: options.item.datastore.project.workspace, id: value.p_id });
        const datastore = new datastore_1.default({ project, id: value.d_id });
        return new item_1.default({ datastore, id: value.i_id });
    }
    convert(value) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.dataType.toLocaleLowerCase()) {
                case field_1.DataType.TEXT:
                case field_1.DataType.TEXTAREA:
                    if (value === null)
                        return '';
                    if (typeof value === 'string')
                        return value;
                    throw new Error(`Field ${this.name} is not string (${value})`);
                case field_1.DataType.DSLOOKUP:
                    if (value === null)
                        return value;
                    if (value instanceof item_1.default) {
                        if (!value.id)
                            yield value.save();
                        return value.id;
                    }
                    throw new Error(`Field ${this.name} is not Item (${value})`);
                case field_1.DataType.NUMBER:
                    if (value === null)
                        return null;
                    if (typeof value === 'number')
                        return value;
                    throw new Error(`Field ${this.name} is not number (${value})`);
                case field_1.DataType.FILE:
                    if (value === null)
                        return null;
                    if (value instanceof fileObject_1.default) {
                        value = [value];
                    }
                    if (Array.isArray(value)) {
                        const res = yield Promise.all(value.map((file) => {
                            return file.id ? file : file.save(this);
                        }));
                        return res.map((file) => file.id);
                    }
                    else {
                        throw new Error(`Field ${this.name} is not FileObject (${value})`);
                    }
                case field_1.DataType.CHECKBOX: {
                    if (!value)
                        return null;
                    if (!Array.isArray(value)) {
                        value = [value];
                    }
                    value.map((v) => {
                        const option = this._findOption(v);
                        if (!option)
                            throw new Error(`Field ${this.name} has not option (${v})`);
                        return option.displayId;
                    });
                }
                case field_1.DataType.SELECT:
                case field_1.DataType.RADIO: {
                    if (value === null)
                        return null;
                    const option = this._findOption(value);
                    if (!option)
                        throw new Error(`Field ${this.name} has not option (${value})`);
                    return option.displayId;
                }
                case field_1.DataType.USERS:
                    if (value === null)
                        return null;
                    return value;
                case field_1.DataType.DATETIME:
                    if (value === null)
                        return null;
                    return value.toISOString();
                case field_1.DataType.AUTONUM:
                    return value;
                case field_1.DataType.CALC:
                case field_1.DataType.LABEL:
                case field_1.DataType.SEPARATOR:
                case field_1.DataType.STATUS:
                    return undefined;
                default:
                    throw new Error(`Field ${this.name} doesn't support (${value})`);
            }
        });
    }
    static get(datastore, fieldId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(datastore_2.DS_FIELD_SETTING, { fieldId, datastoreId: datastore.id });
            return Field.fromJson(Object.assign({ datastore }, res.datastoreGetFieldSettings));
        });
    }
    options() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dataType !== field_1.DataType.SELECT &&
                this.dataType !== field_1.DataType.RADIO &&
                this.dataType !== field_1.DataType.CHECKBOX)
                return null;
            if (this._options.length > 0)
                return this._options;
            this._options = yield fieldOption_1.default.all(this);
            return this._options;
        });
    }
}
exports.default = Field;
//# sourceMappingURL=index.js.map