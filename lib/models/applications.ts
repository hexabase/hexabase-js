export interface Datastore {
    datastore_id: string;
    d_id: string;
    display_id: string;
    name: string;
}

export interface ApplicationsRootObj {
    application_id: string;
    name: string;
    display_id: string;
    datastores: Datastore[];
}

export interface GetApplicationsReq {
    workspace_id: string;
}