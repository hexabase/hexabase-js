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
const fileObject_1 = require("../../graphql/fileObject");
class FileObject extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'file_id':
            case 'id':
            case '_id':
                this.id = value;
                break;
            case 'item':
                this.item = value;
                break;
            case 'datastore':
                this.datastore = value;
                break;
            case 'name':
            case 'filename':
                this.name = value;
                break;
            case 'data':
                this.data = value;
                break;
            case 'contentType':
                this.contentType = value;
                break;
            case 'created_at':
                this.createdAt = new Date(value);
                break;
            case 'deleted':
                this.deleted = value;
                break;
            case 'display_order':
                this.displayOrder = value;
                break;
            case 'filepath':
                this.filepath = value;
                break;
            case 'mediaLink':
                this.mediaLink = value;
                break;
            case 'selfLink':
                this.selfLink = value;
                break;
            case 'size':
                this.size = value;
                break;
            case 'temporary':
                this.temporary = value;
                break;
            case 'timeCreated':
                this.timeCreated = new Date(value);
                break;
            case 'updated':
                this.updated = new Date(value);
                break;
            case 'user_id':
                this.userId = value;
                break;
        }
        return this;
    }
    save(field) {
        return __awaiter(this, void 0, void 0, function* () {
            if (field) {
                return this._saveItem(field);
            }
            else {
                return this._save();
            }
        });
    }
    _saveItem(field) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                return this;
            const params = {
                filename: this.name,
                file: this.data,
                application_id: this.item.datastore.project.id,
                datastore_id: this.item.datastore.id,
            };
            const path = `/api/v0/items/${this.item.id}/fields/${field.id}/attachments`;
            const res = yield this.rest('post', path, {}, params, { binary: true });
            this.set('id', res.file_id);
            return this;
        });
    }
    _save() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.id)
                return this;
            const params = {
                fileName: this.name, file: this.data
            };
            const path = '/api/v0/files';
            const res = yield this.rest('post', path, {}, params, { binary: true });
            this.set('id', res.file_id);
            return this;
        });
    }
    static upload(fileName, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileObject = new FileObject({ name: fileName, data: file });
            yield fileObject.save();
            return fileObject;
        });
    }
    static download(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = new FileObject({ id: fileId });
            yield file.download();
            return file;
        });
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.data)
                return this.data;
            const res = yield this.rest('get', `/api/v0/files/${this.id}`, {}, {}, { response: 'blob' });
            this.set('data', res);
            return res;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(fileObject_1.DELETE_STORAGE, { fileId: this.id });
            return res.deleteStorage.success;
        });
    }
}
exports.default = FileObject;
//# sourceMappingURL=index.js.map