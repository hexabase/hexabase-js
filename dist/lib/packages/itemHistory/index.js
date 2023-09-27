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
const user_1 = __importDefault(require("../user"));
const item_1 = require("../../graphql/item");
class ItemHistory extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'history_id':
                this.id = value;
                break;
            case 'item':
                this.item = value;
                break;
            case 'display_order':
                this.displayOrder = value;
                break;
            case 'comment':
                this.comment = value;
                break;
            case 'is_unread':
                this.isUnread = value;
                break;
            case 'created_at':
                this.createdAt = new Date(value);
                break;
            case 'action_id':
                this.actionId = value;
                break;
            case 'action_name':
                this.actionName = value;
                break;
            case 'transaction_id':
                this.transactionId = value;
                break;
            case 'action_operation':
                this.actionOperation = value;
                break;
            case 'is_status_action':
                this.isStatusAction = value;
                break;
            case 'user':
                this.user = new user_1.default({ id: value });
                break;
            case 'updated_by':
                this.updatedBy = value;
                break;
            case 'updated_at':
                this.updatedAt = new Date(value);
                break;
            case 'media_link':
                this.mediaLink = value;
                break;
            case 'is_updated':
                this.isUpdated = value;
                break;
        }
        return this;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                return this.update();
            return this.create();
        });
    }
    create(unread = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                workspace_id: ItemHistory.client.currentWorkspace.id,
                project_id: this.item.datastore.project.id,
                datastore_id: this.item.datastore.id,
                item_id: this.item.id,
                post_mode: '',
                comment: this.comment,
            };
            if (unread) {
                payload.is_send_item_unread = true;
            }
            const res = yield this.request(item_1.POST_NEW_ITEM_HISTORY, { payload });
            this.sets(res.postNewItemHistory.item_history);
            return true;
        });
    }
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                p_id: this.item.datastore.project.id,
                d_id: this.item.datastore.id,
                i_id: this.item.id,
                h_id: this.id,
                comment: this.comment,
            };
            const res = yield this.request(item_1.POST_UPDATE_ITEM_HISTORY, { payload });
            return !res.postUpdateItemHistory.error;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                p_id: this.item.datastore.project.id,
                d_id: this.item.datastore.id,
                i_id: this.item.id,
                h_id: this.id,
            };
            const res = yield this.request(item_1.POST_DELETE_ITEM_HISTORY, { payload });
            return !res.archiveItemHistory.error;
        });
    }
}
exports.default = ItemHistory;
//# sourceMappingURL=index.js.map