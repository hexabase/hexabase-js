import { HxbAbstract } from '../../../HxbAbstract';
import Workspace from '../workspace';
export default class WorkspaceFunction extends HxbAbstract {
    workspace: Workspace;
    wsSettings: {
        disableArchive?: boolean;
        disableChangeName?: boolean;
        disableChangeLogo?: boolean;
        disableGlobalSearch?: boolean;
        disablePasswordPolicy?: boolean;
        disableManageAdmins?: boolean;
    };
    taskQueue: {
        showTaskList?: number;
    };
    newWorkspaces: {
        newWorkspace?: number;
    };
    groupSettings: {
        disableGroupImport?: boolean;
        disableUserImport?: boolean;
        disableNewGroup?: boolean;
        disableGroupRoles?: boolean;
    };
    developerFunctions: {
        disableBeta?: boolean;
        disableGenerateToken?: boolean;
        disableDeveloperMode?: boolean;
        showAccessKeys?: number;
    };
    wsFunctions: {
        useGlobalSearch?: boolean;
        useBeta?: boolean;
        usePasswordPolicy?: boolean;
        useCreateWorkspace?: number;
    };
    appFunctions: {
        useDashboards?: boolean;
        useQueries?: boolean;
        useCreateApplication?: boolean;
        useReports?: boolean;
    };
    set(key: string, value: any): WorkspaceFunction;
}
