"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class WorkspaceUsage extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'workspace':
                this.workspace = value;
                break;
            case 'users_limit':
                this.usersLimit = value;
                break;
            case 'items_limit':
                this.itemsLimit = value;
                break;
            case 'storage':
                this.storage = value;
                break;
            case 'storage_limit':
                this.storageLimit = value;
                break;
            case 'users':
                this.users = value;
                break;
            case 'datastores':
                this.datastores = value;
                break;
            case 'datastores_limit':
                this.datastoresLimit = value;
                break;
            case 'items':
                this.items = value;
                break;
        }
        return this;
    }
}
exports.default = WorkspaceUsage;
//# sourceMappingURL=index.js.map