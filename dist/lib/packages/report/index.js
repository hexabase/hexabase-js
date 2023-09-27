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
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
const report_1 = require("../../graphql/report");
class Report extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this._data = [];
    }
    set(key, value) {
        switch (key) {
            case 'project':
                this.project = value;
                break;
            case 'rp_id':
            case 'id':
                this.id = value;
                break;
            case 'title':
                this.title = value;
                break;
            case 'display_order':
                this.displayOrder = value;
                break;
            case 'hide_menu':
                this.hideMenu = value;
                break;
        }
        return this;
    }
    static all(project) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.request(report_1.GET_REPORTS, { projectId: project.id });
            return res.getReports
                .map((params) => Report.fromJson(Object.assign({ project }, params)));
        });
    }
    data({ page = 1, perPage = 0, total = true } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._data.length > 0)
                return this._data;
            const reportDataPayload = {
                include_date_at: true,
                include_lookups: true,
                include_item_ref: true,
                return_number_value: true,
                page,
                per_page: perPage,
                return_utc_datetime: true,
                omit_total_items: total,
            };
            const res = yield this.request(report_1.REPORT_DEFAULT, {
                projectId: this.project.id,
                reportId: this.id,
                reportDataPayload,
            });
            this._data = res.reportData.report_results;
            return this._data;
        });
    }
}
exports.default = Report;
//# sourceMappingURL=index.js.map