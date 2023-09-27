"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class AppFunction extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this.dashboards = {
            disableEditDashItems: false,
            disableEditDashboards: false,
        };
        this.appTemplates = {
            disableNewApplication: false,
            disableSaveTemplates: false,
        };
        this.appSettings = {
            disableRoleSettings: false,
            disableProgramExtension: false,
            disableLeftMenuExtension: false,
            disableDeleteApplication: false,
            disableChangeName: false,
            enableFieldValuesValidation: false,
            enableActionValidation: false,
        };
        this.csvImport = {
            useQrDownload: false,
            disableCsvUpdate: false,
            disableReplaceImport: false,
        };
        this.dataReports = {
            disableSaveReports: false,
            disableCsvDownloads: false,
            disableEditReports: false,
        };
        this.itemView = {
            disablePinItems: false,
            disableEditFields: false,
            disableEditStatuses: false,
            disablePagination: false,
            disableChangeLayouts: false,
            disableEditActions: false,
            hideLinkItems: false,
        };
        this.datastores = {
            disableStatusUpdate: false,
            disableGridView: false,
            disableQuery: false,
            disableDbSettings: false,
            disableBoradView: false,
        };
    }
    set(group, params) {
        switch (group) {
            case 'dashboards':
                this.dashboards.disableEditDashItems = params.disable_edit_dash_items;
                this.dashboards.disableEditDashboards = params.disable_edit_dashboards;
                break;
            case 'appTemplates':
                this.appTemplates.disableNewApplication = params.disable_new_application;
                this.appTemplates.disableSaveTemplates = params.disable_save_templates;
                break;
            case 'appSettings':
                this.appSettings.disableRoleSettings = params.disable_role_settings;
                this.appSettings.disableProgramExtension = params.disable_program_extension;
                this.appSettings.disableLeftMenuExtension = params.disable_left_menu_extension;
                this.appSettings.disableDeleteApplication = params.disable_delete_application;
                this.appSettings.disableChangeName = params.disable_change_name;
                this.appSettings.enableFieldValuesValidation = params.enable_field_values_validation;
                this.appSettings.enableActionValidation = params.enable_action_validation;
                break;
            case 'csvImport':
                this.csvImport.useQrDownload = params.use_qr_download;
                this.csvImport.disableCsvUpdate = params.disable_csv_update;
                this.csvImport.disableReplaceImport = params.disable_replace_import;
                break;
            case 'dataReports':
                this.dataReports.disableSaveReports = params.disable_save_reports;
                this.dataReports.disableCsvDownloads = params.disable_csv_downloads;
                this.dataReports.disableEditReports = params.disable_edit_reports;
                break;
            case 'itemView':
                this.itemView.disablePinItems = params.disable_pin_items;
                this.itemView.disableEditFields = params.disable_edit_fields;
                this.itemView.disableEditStatuses = params.disable_edit_statuses;
                this.itemView.disablePagination = params.disable_pagination;
                this.itemView.disableChangeLayouts = params.disable_change_layouts;
                this.itemView.disableEditActions = params.disable_edit_actions;
                this.itemView.hideLinkItems = params.hide_link_items;
                break;
            case 'datastores':
                this.datastores.disableStatusUpdate = params.disable_status_update;
                this.datastores.disableGridView = params.disable_grid_view;
                this.datastores.disableQuery = params.disable_query;
                this.datastores.disableDbSettings = params.disable_db_settings;
                this.datastores.disableBoradView = params.disable_borad_view;
                break;
        }
        return this;
    }
}
exports.default = AppFunction;
//# sourceMappingURL=index.js.map