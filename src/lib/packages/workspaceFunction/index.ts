import { HxbAbstract } from "../../../HxbAbstract";

import {
	DeveloperFunctions,
	GroupSettings,
	NewWorkspaces,
	TaskQueue,
	WsSettings
} from "../../types/workspace";
import Workspace from "../workspace";

export default class WorkspaceFunction extends HxbAbstract {
	workspace: Workspace;
	wsSettings:{
		disableArchive?: boolean;
		disableChangeName?: boolean;
		disableChangeLogo?: boolean;
		disableGlobalSearch?: boolean;
		disablePasswordPolicy?: boolean;
		disableManageAdmins?: boolean;
	} = {};
	taskQueue:{
		showTaskList?: number
	} = {};
	newWorkspaces:{
		newWorkspace?: number;
	} = {};
	groupSettings:{
		disableGroupImport?: boolean;
		disableUserImport?: boolean;
		disableNewGroup?: boolean;
		disableGroupRoles?: boolean;
	} = {};
	developerFunctions: {
		disableBeta?: boolean;
		disableGenerateToken?: boolean;
		disableDeveloperMode?: boolean;
		showAccessKeys?: number;
	} = {};
	wsFunctions: {
		useGlobalSearch?: boolean;
		useBeta?: boolean;
		usePasswordPolicy?: boolean;
		useCreateWorkspace?: number;
	} = {};
	appFunctions: {
		useDashboards?: boolean;
		useQueries?: boolean;
		useCreateApplication?: boolean;
		useReports?: boolean;
	} = {};

	constructor(workspace?: Workspace) {
		super();
		if (workspace) this.workspace = workspace;
	}

	static fromJson(json: {[key: string]: any}): WorkspaceFunction {
		const workspaceFunction = new WorkspaceFunction();
		workspaceFunction.sets(json);
		return workspaceFunction;
	}

  sets(params: {[key: string]: any}): WorkspaceFunction {
    Object.keys(params).forEach(key => {
      this.set(key, params);
    });
    return this;
  }

  set(key: string, value: any): WorkspaceFunction {
    switch (key) {
			case 'ws_settings':
				value = value as WsSettings;
				this.wsSettings.disableArchive = value.disable_archive;
				this.wsSettings.disableChangeName = value.disable_change_name;
				this.wsSettings.disableChangeLogo = value.disable_change_logo;
				this.wsSettings.disableGlobalSearch = value.disable_global_search;
				this.wsSettings.disablePasswordPolicy = value.disable_password_policy;
				this.wsSettings.disableManageAdmins = value.disable_manage_admins;
				break;
			case 'task_queue':
				value = value as TaskQueue;
				this.taskQueue.showTaskList = value.show_task_list;
				break;
			case 'new_workspaces':
				value = value as NewWorkspaces;
				this.newWorkspaces.newWorkspace = value.new_workspace;
				break;
			case 'group_settings':
				value = value as GroupSettings;
				this.groupSettings.disableGroupImport = value.disable_group_import;
				this.groupSettings.disableUserImport = value.disable_user_import;
				this.groupSettings.disableNewGroup = value.disable_new_group;
				this.groupSettings.disableGroupRoles = value.disable_group_roles;
				break;
			case 'developer_functions':
				value = value as DeveloperFunctions;
				this.developerFunctions.disableBeta = value.disable_beta;
				this.developerFunctions.disableGenerateToken = value.disable_generate_token;
				this.developerFunctions.disableDeveloperMode = value.disable_developer_mode;
				this.developerFunctions.showAccessKeys = value.show_access_keys;
				break;
			case 'ws_functions':
				this.wsFunctions.useGlobalSearch = value.use_global_search;
				this.wsFunctions.useBeta = value.use_beta;
				this.wsFunctions.usePasswordPolicy = value.use_password_policy;
				this.wsFunctions.useCreateWorkspace = value.use_create_workspace;
				break;
			case 'app_functions':
				this.appFunctions.useDashboards = value.use_dashboards;
				this.appFunctions.useQueries = value.use_queries;
				this.appFunctions.useCreateApplication = value.use_create_application;
				this.appFunctions.useReports = value.use_reports;
				break;
		}
		return this;
	}
}