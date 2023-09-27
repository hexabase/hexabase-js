import { HxbAbstract } from '../../../HxbAbstract';
export default class AppFunction extends HxbAbstract {
    name: string;
    dashboards: {
        disableEditDashItems: boolean;
        disableEditDashboards: boolean;
    };
    appTemplates: {
        disableNewApplication: boolean;
        disableSaveTemplates: boolean;
    };
    appSettings: {
        disableRoleSettings: boolean;
        disableProgramExtension: boolean;
        disableLeftMenuExtension: boolean;
        disableDeleteApplication: boolean;
        disableChangeName: boolean;
        enableFieldValuesValidation: boolean;
        enableActionValidation: boolean;
    };
    csvImport: {
        useQrDownload: boolean;
        disableCsvUpdate: boolean;
        disableReplaceImport: boolean;
    };
    dataReports: {
        disableSaveReports: boolean;
        disableCsvDownloads: boolean;
        disableEditReports: boolean;
    };
    itemView: {
        disablePinItems: boolean;
        disableEditFields: boolean;
        disableEditStatuses: boolean;
        disablePagination: boolean;
        disableChangeLayouts: boolean;
        disableEditActions: boolean;
        hideLinkItems: boolean;
    };
    datastores: {
        disableStatusUpdate: boolean;
        disableGridView: boolean;
        disableQuery: boolean;
        disableDbSettings: boolean;
        disableBoradView: boolean;
    };
    set(group: string, params: {
        [key: string]: boolean;
    }): AppFunction;
}
