"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class ItemStatus extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'status_id':
                this.id = value;
                break;
            case 'display_id':
                this.displayId = value;
                break;
            case 'status_name':
                this.name = value;
                break;
            case 'item':
                this.item = value;
                break;
        }
        return this;
    }
}
exports.default = ItemStatus;
//# sourceMappingURL=index.js.map