"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../HxbAbstract");
const query_1 = __importDefault(require("./query"));
const condition_1 = __importDefault(require("./condition"));
class HexabaseSQL extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this.condition = condition_1.default;
    }
    set(key, value) {
        switch (key) {
            case 'projectId':
                this.projectId = value;
                break;
            case 'datastoreId':
                this.datastoreId = value;
                break;
        }
        return this;
    }
    from(datastoreId) {
        this.set('datastoreId', datastoreId);
        return new query_1.default({ queryClient: this });
    }
    query() {
        return new query_1.default({ queryClient: this });
    }
}
exports.default = HexabaseSQL;
//# sourceMappingURL=index.js.map