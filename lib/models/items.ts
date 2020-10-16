
export interface Item {
}

export interface Option {
    oid: string;
    sort_id: number;
    color: string;
    value: string;
    enabled: boolean;
}

export interface Status {
    id: string;
    sid: string;
    name: string;
    sort_id: number;
}

export interface Field {
    as_title: boolean;
    data_type: string;
    display_id: string;
    display_name: string;
    field: string;
    field_index: number;
    order: number;
    show_list: boolean;
    search: boolean;
    options: Option[];
    statuses: Status[];
}

export interface ItemsResp {
    items: Item[];
    totalItems: number;
    fields: Field[];
}

export interface Condition {
    search_value: string[];
    data_type: string;
    id: string;
    exact_match: boolean;
    include_null: boolean;
}

export interface ItemsReq {
    project_id: string;
    datastore_id: string;
    conditions?: Condition[];
    sort_field_id?: string;
    sort_order?: string;
    page: number;
    per_page: number;
    use_field_display_id?: boolean;
    use_display_id?: boolean;
    for_csv_download?: boolean;
    update_download?: boolean;
    include_links?: boolean;
    result_format?: string;
    set_as_default?: boolean;
    use_default_search?: boolean;
}

export interface Status {
    status_id: string;
    status_name: string;
}

export interface Result {
    f_id: string;
    name: string;
    display_id: string;
    data_type: string;
    order: number;
    statuses: Status[];
}

export interface ItemsSearchConditionsResp {
    has_error: boolean;
    result: Result[];
}

export interface ItemsSearchConditionsReq {
    project_id: string;
    datastore_id: string;
}

export interface FieldValue {
    field_id: string;
    field_name: string;
    dataType: string;
    value: any;
    use_as_search: boolean;
    show_in_list: boolean;
}

export interface StatusList {
    status_id: string;
    status_name: string;
}

export interface StatusAction {
    action_id: string;
    action_name: string;
    display_order: number;
    crud_type: string;
    next_status_id: string;
}

export interface ItemAction {
    action_id: string;
    action_name: string;
    display_order: number;
    crud_type: string;
}

export interface ItemDetailsResp {
    title: string;
    field_values: FieldValue[];
    status_list: StatusList[];
    status_actions: StatusAction[];
    item_actions: ItemAction[];
}

export interface ItemDetailsReq {
    project_id: string;
    datastore_id: string;
    item_id: string;
}

export interface NewItemActionReq {
    datastore_id: string;
    project_id?: string;
    use_display_id?: boolean;
    is_notify_to_sender: boolean;
    item: any;
    related_ds_items: any;
    return_item_result: boolean;
}