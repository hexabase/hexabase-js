"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
const template_1 = __importDefault(require("../template"));
class TemplateCategory extends HxbAbstract_1.HxbAbstract {
    constructor(project) {
        super();
        this.project = project;
    }
    set(key, value) {
        switch (key) {
            case 'category':
                this.name = value;
                break;
            case 'templates':
                this.templates = value.map((template) => template_1.default.fromJson(Object.assign({ project: this.project }, template)));
                break;
        }
        return this;
    }
}
exports.default = TemplateCategory;
//# sourceMappingURL=index.js.map