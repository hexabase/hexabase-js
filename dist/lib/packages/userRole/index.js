"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class UserRole extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'can_execute':
                this.canExecute = value;
                break;
            case 'can_use':
                this.canUse = value;
                break;
            case 'type':
                this.type = value;
                break;
            case 'name':
                this.name = value;
                break;
            case 'display_id':
                this.displayId = value;
                break;
            case 'role_id':
                this.id = value;
                break;
        }
        return this;
    }
}
exports.default = UserRole;
//# sourceMappingURL=index.js.map