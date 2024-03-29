export interface SearchCondition {
  search_value?: any;
  data_type?: string;
  id?: string;
  rpf_id?: string;
  exact_match?: boolean;
  not_match?: boolean;
  include_null?: boolean;
  conditions?: SearchCondition[];
  use_or_condition?: boolean;
}

export interface SortField {
  id?: string;
  order?: string;
}

export interface GetItemsPl {
  conditions?: SearchCondition[];
  use_or_condition?: boolean;
  unread_only?: boolean;
  sort_fields?: SortField;
  sort_field_id?: string;
  sort_order?: string;
  page: number;
  per_page: number;
  use_field_id?: boolean;
  use_display_id?: boolean;
  include_links?: boolean;
  include_lookups?: boolean;
  return_number_value?: boolean;
  format?: string;
  use_default_search?: boolean;
  return_count_only?: boolean;
  omit_fields_data?: boolean;
  omit_total_items?: boolean;
  data_result_timeout_sec?: number;
  total_count_timeout_sec?: number;
  debug_query?: boolean;
}

export interface GetHistoryPl {
  from_index?: number;
  to_index?: number;
  from_datetime?: Date;
  to_datetime?: Date;
  exclude_action_history?: boolean;
  exclude_comment_history?: boolean;
}

export interface FieldAccessKeyUpdates {
  overwrite?: boolean;
  ignore_action_settings?: boolean;
  apply_related_ds?: boolean;
  Groups_to_publish?: any;
  roles_to_publish?: any;
  users_to_publish?: any;
}


export interface CreateNewItemPl {
  action_id?: string;
  item: any;
  use_display_id?: boolean;
  is_notify_to_sender?: boolean;
  return_item_result?: boolean;
  ensure_transaction?: boolean;
  exec_children_post_procs?: boolean;
  as_params?: any;
  related_ds_items?: any;
  access_key_updates?: FieldAccessKeyUpdates;
}
export interface CreateNewItem {
  projectId: string;
  datastoreId: string;
  payload: CreateNewItemPl;
}

export interface UpdateCurrentItem {
  projectId: string;
  datastoreId: string;
  itemId: string;
  itemActionParameters: ItemActionParameters;
}

export interface DeleteItemReq {
  u_id?: string;
  a_id: string;
  use_display_id?: boolean;
  delete_linked_items?: boolean;
  target_datastores?: any;
}

export interface DeleteItem {
  projectId: string;
  datastoreId: string;
  itemId: string;
  deleteItemReq: DeleteItemReq;
}

export interface DeleteItemParameter {
  deleteLinkedItems?: boolean;
  targetDatastores?: any;
  useDisplayId?: boolean;
}

export interface ConditionDeleteItems {
  search_value?: any;
  id?: string;
}

export interface DeleteItemsParameter {
  conditions?: ConditionDeleteItems[];
  use_display_id?: boolean;
}

export interface DeleteItemsParameters {
  datastoreId: string;
  projectId?: string;
  deleteItemsParameters?: DeleteItemsParameter;
}

export interface GetItemDetailPl {
  include_lookups: boolean;
  use_display_id: boolean;
  return_number_value: boolean;
  format: string;
  include_linked_items: boolean;
}

export interface ItemHistory {
  history_id?: string;
  display_order?: number;
  is_unread?: boolean;
  comment?: string;
  action_id?: string;
  action_name?: string;
  action_operation?: string;
  is_status_action?: boolean;
  transaction_id?: string;
  datastore_id?: string;
  datastore_name?: string;
  user_id?: string;
  username?: string;
  email?: string;
  media_link?: string;
  updated_at?: string;
  updated_by?: string;
  file_ids?: any;
}

export interface ItemActionParameters {
  action_id?: string;
  rev_no?: number;
  use_display_id?: boolean;
  is_notify_to_sender?: boolean;
  ensure_transaction?: boolean;
  exec_children_post_procs?: boolean;
  history?: ItemHistory;
  datastore_id?: string;
  comment?: string;
  changes?: any;
  item?: any;
  groups_to_publish?: any;
  is_force_update?: boolean;
  access_key_updates?: FieldAccessKeyUpdates;
  return_item_result?: boolean;
  return_actionscript_logs?: boolean;
  disable_linker?: boolean;
  as_params?: any;
  related_ds_items?: any;
}
export interface FieldAccessKeyUpdates {
  overwrite?: boolean;
  ignore_action_settings?: boolean;
  apply_related_ds?: boolean;
  groups_to_publish?: any;
  roles_to_publish?: any;
  users_to_publish?: any;
}

export interface ItemUpdatePayload {
  action_id?: string;
  comment?: string;
  rev_no?: number;
  is_force_update?: boolean;
  use_display_id?: boolean;
  is_notify_to_sender?: boolean;
  history?: ItemHistory;
  changes?: any;
  groups_to_publish?: any;
  item?: any;
  return_item_result?: boolean;
  ensure_transaction?: boolean;
  exec_children_post_procs?: boolean;
  as_params?: any;
  related_ds_items?: any;
  access_key_updates?: FieldAccessKeyUpdates;
}

export interface ItemExecuteActionPayload {
  projectId: string;
  datastoreId: string;
  actionId: string;
  itemId: string;
  itemActionParameters: ItemActionParameters;
}

export interface ItemLinkRequestInput {
  link_datastore_id: string;
  link_item_id: string;
}
export interface UpdateItemLinkInput {
  old_link_datastore_id: string;
  old_link_item_id: string;
  new_link_datastore_id: string;
  new_link_item_id: string;
}

export interface CreateCommentParameters {
  comment: string;
  is_send_item_unread?: boolean;
}

export interface CreateCommentItemsParameters {
  comment: string;
  datastore_id: string;
  is_related_post?: boolean;
  is_send_item_unread?: boolean;
  item_id: string;
  post_mode: string;
  posting?: boolean;
  project_id: string;
  workspace_id: string;
}

export interface UpdateCommentParameters {
  comment: string;
}

export interface UpdateCommentItemsParameters {
  comment: string;
  d_id: string;
  i_id: string;
  h_id: string;
  p_id: string;
}

export interface ArchiveCommentItemsParameters {
  d_id: string;
  i_id: string;
  h_id: string;
  p_id: string;
}

export interface GetItemsParameters {
  project_id?: string;
  datastore_id?: string;
  conditions?: SearchCondition[];
  use_or_condition?: boolean;
  unread_only?: boolean;
  sort_fields?: SortField;
  sort_field_id?: string;
  sort_order?: string;
  page: number;
  per_page: number;
  use_field_id?: boolean;
  use_display_id?: boolean;
  use_default_search?: boolean;
  include_links?: boolean;
  include_lookups?: boolean;
  return_number_value?: boolean;
  format?: string;
  return_count_only?: boolean;
  include_fields_data?: boolean;
  omit_fields_data?: boolean;
  omit_total_items?: boolean;
  data_result_timeout_sec?: number;
  total_count_timeout_sec?: number;
  debug_query?: boolean;
  select_fields?: any;
  select_fields_lookup?: any;
}
