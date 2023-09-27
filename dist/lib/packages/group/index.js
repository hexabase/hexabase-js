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
const workspace_1 = require("../../../lib/graphql/workspace");
const HxbAbstract_1 = require("../../../HxbAbstract");
class Group extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'index':
                this.index = value;
                break;
            case 'name':
                this.name = value;
                break;
            case 'group_id':
                this.group_id = value;
                break;
            case 'id':
                this.id = value;
                break;
        }
        return this;
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(workspace_1.WORKSPACE_GROUP_CHILDREN, { groupId: this.id });
            const { group, children } = res.workspaceGetGroupChildren;
            this.sets(group);
            if (children) {
                this.children = children.map((child) => Group.fromJson(child));
            }
            return true;
        });
    }
    addByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.rest('post', '/api/v0/users', {}, {
                email,
                g_id: this.id,
            });
            return res;
        });
    }
}
exports.default = Group;
//# sourceMappingURL=index.js.map