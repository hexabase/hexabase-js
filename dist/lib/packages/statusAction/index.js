"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class StatusAction extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'action_id':
                this.id = value;
                break;
            case 'display_id':
                this.displayId = value;
                break;
            case 'action_name':
                this.name = value;
                break;
            case 'display_order':
                this.displayOrder = value;
                break;
            case 'crud_type':
                this.crudType = value;
                break;
            case 'item':
                this.item = value;
                break;
            case 'next_status_id':
                this.nextStatusId = value;
                break;
        }
        return this;
    }
}
exports.default = StatusAction;
//# sourceMappingURL=index.js.map