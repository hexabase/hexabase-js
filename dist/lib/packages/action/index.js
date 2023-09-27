"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
const userRole_1 = __importDefault(require("../userRole"));
class Action extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this.roles = [];
    }
    set(key, value) {
        switch (key) {
            case 'datastore':
                this.datastore = value;
                break;
            case 'action_id':
                this.id = value;
                break;
            case 'display_id':
                this.displayId = value;
                break;
            case 'name':
                this.name = value;
                break;
            case 'is_status_action':
                this.isStatusAction = value;
                break;
            case 'operation':
                this.operation = value;
                break;
            case 'set_status':
                this.setStatus = value;
                break;
            case 'role':
                this.roles = value
                    .map(role => userRole_1.default.fromJson(role));
        }
        return this;
    }
}
exports.default = Action;
//# sourceMappingURL=index.js.map