"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
const templateCategory_1 = __importDefault(require("../templateCategory"));
const project_1 = require("../../graphql/project");
class Template extends HxbAbstract_1.HxbAbstract {
    constructor(category) {
        super();
        this.category = category;
    }
    set(key, value) {
        switch (key) {
            case 'tp_id':
                this.id = value;
                break;
            case 'name':
                this.name = value;
                break;
            case 'description':
                this.description = value;
                break;
        }
        return this;
    }
    static all() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(project_1.GET_TEMPLATES);
            return res.getTemplates.categories.map(category => templateCategory_1.default.fromJson(Object.assign({ project: this }, category)));
        });
    }
}
exports.default = Template;
//# sourceMappingURL=index.js.map