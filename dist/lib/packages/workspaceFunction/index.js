"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HxbAbstract_1 = require("../../../HxbAbstract");
class WorkspaceFunction extends HxbAbstract_1.HxbAbstract {
    constructor() {
        super(...arguments);
        this.wsSettings = {};
        this.taskQueue = {};
        this.newWorkspaces = {};
        this.groupSettings = {};
        this.developerFunctions = {};
        this.wsFunctions = {};
        this.appFunctions = {};
    }
    set(key, value) {
        switch (key) {
            case 'workspace':
                this.workspace = value;
                break;
            case 'ws_settings':
                value = value;
                this.wsSettings.disableArchive = value.disable_archive;
                this.wsSettings.disableChangeName = value.disable_change_name;
                this.wsSettings.disableChangeLogo = value.disable_change_logo;
                this.wsSettings.disableGlobalSearch = value.disable_global_search;
                this.wsSettings.disablePasswordPolicy = value.disable_password_policy;
                this.wsSettings.disableManageAdmins = value.disable_manage_admins;
                break;
            case 'task_queue':
                value = value;
                this.taskQueue.showTaskList = value.show_task_list;
                break;
            case 'new_workspaces':
                value = value;
                this.newWorkspaces.newWorkspace = value.new_workspace;
                break;
            case 'group_settings':
                value = value;
                this.groupSettings.disableGroupImport = value.disable_group_import;
                this.groupSettings.disableUserImport = value.disable_user_import;
                this.groupSettings.disableNewGroup = value.disable_new_group;
                this.groupSettings.disableGroupRoles = value.disable_group_roles;
                break;
            case 'developer_functions':
                value = value;
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
exports.default = WorkspaceFunction;
//# sourceMappingURL=index.js.map