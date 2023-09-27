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
const HxbAbstract_1 = require("../../../HxbAbstract");
class FieldOption extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        if (value === null)
            return this;
        switch (key) {
            case '_id':
            case 'o_id':
                this.id = value;
                break;
            case 'color':
                this.color = value;
                break;
            case 'created_at':
                this.createdAt = new Date(value);
                break;
            case 'display_id':
                this.displayId = value;
                break;
            case 'enabled':
                this.enabled = value;
                break;
            case 'selected':
                this.selected = value;
                break;
            case 'sort_id':
                this.sortId = value;
                break;
            case 'updated_at':
                this.updatedAt = new Date(value);
                break;
            case 'value':
                this.value = value;
                break;
        }
        return this;
    }
    static all(field) {
        return __awaiter(this, void 0, void 0, function* () {
            const { datastore } = field;
            const path = `/api/v0/applications/${datastore.project.id}/datastores/${datastore.id}/fields/${field.id}`;
            const res = yield this.rest('GET', path, { with_options: 'true' });
            return res.options
                .map(params => FieldOption.fromJson(Object.assign({ field }, params)));
        });
    }
}
exports.default = FieldOption;
//# sourceMappingURL=index.js.map