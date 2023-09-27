"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class Redirect extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'redirect_url':
                this.redirectUrl = value;
                break;
            case 'is_apply_redirect_url_for_disabled_users':
                this.isApplyRedirectUrlForDisabledUsers = value;
                break;
        }
        return this;
    }
}
exports.default = Redirect;
//# sourceMappingURL=index.js.map