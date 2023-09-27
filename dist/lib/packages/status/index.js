"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class Status extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'status_id':
                this.id = value;
                break;
            case 'display_id':
                this.displayId = value;
                break;
            case 'name':
                this.name = value;
                break;
            case 'displayed_name':
                this.displayedName = value;
                break;
            case 'sort_id':
                this.sortId = value;
                break;
            case 'x':
                this.x = value;
                break;
            case 'y':
                this.y = value;
                break;
        }
        return this;
    }
}
exports.default = Status;
//# sourceMappingURL=index.js.map