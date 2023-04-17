import { HxbAbstract } from "../../../HxbAbstract";

export default class AppFunction extends HxbAbstract {
	name: string;
	dashboards: {
		disableEditDashItems: boolean;
		disableEditDashboards: boolean;
	} = {
		disableEditDashItems: false,
		disableEditDashboards: false,
	};

	appTemplates: {
		disableNewApplication: boolean;
		disableSaveTemplates: boolean;
	} = {
		disableNewApplication: false,
		disableSaveTemplates: false,
	};

	appSettings: {
		disableRoleSettings: boolean;
		disableProgramExtension: boolean;
		disableLeftMenuExtension: boolean;
		disableDeleteApplication: boolean;
		disableChangeName: boolean;
		enableFieldValuesValidation: boolean;
		enableActionValidation: boolean;
	} = {
		disableRoleSettings: false,
		disableProgramExtension: false,
		disableLeftMenuExtension: false,
		disableDeleteApplication: false,
		disableChangeName: false,
		enableFieldValuesValidation: false,
		enableActionValidation: false,
	};

	csvImport:{
		useQrDownload: boolean;
		disableCsvUpdate: boolean;
		disableReplaceImport: boolean;
	} = {
		useQrDownload: false,
		disableCsvUpdate: false,
		disableReplaceImport: false,
	};

	dataReports:{
		disableSaveReports: boolean;
		disableCsvDownloads: boolean;
		disableEditReports: boolean;
	} = {
		disableSaveReports: false,
		disableCsvDownloads: false,
		disableEditReports: false,
	};
	
	itemView:{
		disablePinItems: boolean;
		disableEditFields: boolean;
		disableEditStatuses: boolean;
		disablePagination: boolean;
		disableChangeLayouts: boolean;
		disableEditActions: boolean;
		hideLinkItems: boolean;
	} = {
		disablePinItems: false,
		disableEditFields: false,
		disableEditStatuses: false,
		disablePagination: false,
		disableChangeLayouts: false,
		disableEditActions: false,
		hideLinkItems: false,
	};

	datastores: {
		disableStatusUpdate: boolean;
		disableGridView: boolean;
		disableQuery: boolean;
		disableDbSettings: boolean;
		disableBoradView: boolean;
	} = {
		disableStatusUpdate: false,
		disableGridView: false,
		disableQuery: false,
		disableDbSettings: false,
		disableBoradView: false,
	};

	static fromJson(json: {[key: string]: any}): AppFunction {
		const appFunction = new AppFunction();
		appFunction.sets(json);
		return appFunction;
	}
	
	sets(params: {[key: string]: {[key: string]: boolean}}): AppFunction {
		Object.keys(params).forEach(group => {
			this.set(group, params[group]);
		});
		return this;
	}

	set(group: string, params: {[key: string]: boolean}): AppFunction {
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