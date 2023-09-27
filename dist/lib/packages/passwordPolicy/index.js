"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class PasswordPolicy extends HxbAbstract_1.HxbAbstract {
    set(key, value) {
        switch (key) {
            case 'expired_day':
                this.expiredDay = value;
                break;
            case 'min_length':
                this.minLength = value;
                break;
            case 'lockout_time':
                this.lockoutTime = value;
                break;
            case 'lockout_count':
                this.lockoutCount = value;
                break;
            case 'use_same_limit':
                this.useSameLimit = value;
                break;
            case 'use_pattern_check':
                this.usePatternCheck = value;
                break;
            case 'use_min_length':
                this.useMinLength = value;
                break;
            case 'use_lockout_time':
                this.useLockoutTime = value;
                break;
            case 'use_lockout_count':
                this.useLockoutCount = value;
                break;
            case 'use_language_ja':
                this.useLanguageJa = value;
                break;
            case 'use_language_en':
                this.useLanguageEn = value;
                break;
            case 'use_expired_day':
                this.useExpiredDay = value;
                break;
            case 'same_limit':
                this.sameLimit = value;
                break;
            case 'pattern_check_type':
                this.patternCheckType = value;
                break;
        }
        return this;
    }
}
exports.default = PasswordPolicy;
//# sourceMappingURL=index.js.map