"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class FieldLayout extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'sizeX':
                this.sizeX = value;
                break;
            case 'sizeY':
                this.sizeY = value;
                break;
            case 'col':
                this.col = value;
                break;
            case 'row':
                this.row = value;
                break;
            case 'field':
                this.field = value;
                break;
        }
        return this;
    }
}
exports.default = FieldLayout;
//# sourceMappingURL=index.js.map