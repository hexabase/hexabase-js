"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class Language extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'default':
                this.default = value;
                break;
            case 'lang_cd':
                this.langCd = value;
                break;
            case 'use':
                this.use = value;
                break;
        }
        return this;
    }
}
exports.default = Language;
//# sourceMappingURL=index.js.map