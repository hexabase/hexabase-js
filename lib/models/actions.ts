export interface Action {
    action_id: string;
    display_order: number;
    description: string;
    crud_type: string;
    next_status_id: string;
}

export interface ActionsNewResp {
    actions: Action[];
}

export interface ActionAndFieldsReq {
    datastore_id: string;
    action_id: string;
}