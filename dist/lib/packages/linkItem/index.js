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
const item_1 = require("../../graphql/item");
const HxbAbstract_1 = require("../../../HxbAbstract");
class LinkItem extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this.saved = false;
    }
    set(key, value) {
        switch (key) {
            case 'item':
                this.item = value;
                break;
            case 'linkedItem':
                this.linkedItem = value;
                break;
            case 'saved':
                this.saved = value;
                break;
        }
        return this;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.saved)
                return true;
            const params = {
                projectId: this.item.datastore.project.id,
                datastoreId: this.item.datastore.id,
                itemId: this.item.id,
                itemLinkRequestInput: {
                    link_datastore_id: this.linkedItem.datastore.id,
                    link_item_id: this.linkedItem.id,
                }
            };
            console.log(params);
            const res = yield this.request(item_1.ADD_ITEM_LINK, params);
            this.saved = true;
            return res.addItemLink.success;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.saved)
                return true;
            const params = {
                projectId: this.item.datastore.project.id,
                datastoreId: this.item.datastore.id,
                itemId: this.item.id,
                itemLinkRequestInput: {
                    link_datastore_id: this.linkedItem.datastore.id,
                    link_item_id: this.linkedItem.id,
                }
            };
            const res = yield this.request(item_1.DELETE_ITEM_LINK, params);
            this.saved = true;
            return res.deleteItemLink.success;
        });
    }
}
exports.default = LinkItem;
//# sourceMappingURL=index.js.map