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