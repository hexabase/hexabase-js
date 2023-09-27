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
const fileObject_1 = require("../../graphql/fileObject");
const HxbAbstract_1 = require("../../../HxbAbstract");
class Storage extends HxbAbstract_1.HxbAbstract {
    getFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                file: undefined,
                error: undefined,
            };
            try {
                const res = yield this.request(fileObject_1.GET_DOWNLOAD_FILE, { id });
                data.file = res.getDownloadFile;
            }
            catch (error) {
                data.error = JSON.stringify(error.response.errors);
            }
            return data;
        });
    }
    createFile(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                data: undefined,
                error: undefined,
            };
            try {
                const res = yield this.request(fileObject_1.FILE_ATTACHMENT, { payload });
                data.data = res.createItemFileAttachment;
            }
            catch (error) {
                data.error = JSON.stringify(error.response.errors);
            }
            return data;
        });
    }
    delete(fileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                data: undefined,
                error: undefined,
            };
            try {
                const res = yield this.request(fileObject_1.DELETE_STORAGE, fileId);
                data.data = res.deleteStorage;
            }
            catch (error) {
                data.error = JSON.stringify(error.response.errors);
            }
            return data;
        });
    }
}
exports.default = Storage;
//# sourceMappingURL=index.js.map