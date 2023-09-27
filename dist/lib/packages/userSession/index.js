"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class UserSession extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'use':
                this.use = value;
                break;
            case 'default':
                this.default = value;
                break;
            case 'session_timeout_sec':
                this.sessionTimeoutSec = value;
                break;
        }
        return this;
    }
}
exports.default = UserSession;
//# sourceMappingURL=index.js.map