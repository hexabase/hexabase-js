export interface SearchCondition {
  search_value?: any;
  data_type?: string;
  id?: string;
  rpf_id?: string;
  exact_match?: boolean;
  not_match?: boolean;
  include_null?: boolean;
  conditions?: SearchCondition;
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

export interface GetItemDetailPl {
  include_lookups: boolean;
  use_display_id: boolean;
  return_number_value: boolean;
  format: string;
  include_linked_items: boolean;
}