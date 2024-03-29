import { ItemHistory } from './input';
import { FieldNameENJP, GenericAPIError, ResponseErrorNull, ResponseOkModel } from '../../util/type';
import Item from '../../packages/item';

export interface DsItems {
  items: any;
  totalItems: number;
}
export interface FieldHistories {
  history_id: string;
  display_order: number;
  is_unread: boolean;
  comment: string;
  created_at: string;
  action_id: string;
  action_name: string;
  transaction_id: string;
  action_operation: string;
  is_status_action: boolean;
  datastore_id: string;
  datastore_name: string;
  user_id: string;
  username: string;
  email: string;
  updated_by: string;
  updated_at: string;
  media_link: string;
  is_updated: boolean;
}

export interface FieldHistoriessOld {
  h_id: string;
  user_id: string;
  i_id: string;
  is_unread: number;
  history: FieldHistories;
}
export interface ItemHistoriesOld {
  unread: number;
  histories: FieldHistoriessOld[];
}

export interface ItemHistories {
  unread: number;
  histories: FieldHistories[];
}

export interface ItemID {
  item_id: string;
}

export interface ItemNew {
  error?: any;
  history_id?: string;
  item: any;
  item_id: string;
}
export interface ActionScript {
  lang: string;
  enabled: boolean;
  script: string;
}

export interface ActionField {
  ID?: string;
  a_id?: string;
  display_id?: string;
  w_id?: string;
  p_id?: string;
  d_id?: string;
  name?: string;
  status_id?: string;
  is_status_action?: boolean;
  display_order?: number;
  description?: string;
  show_in_home?: boolean;
  pin_by_default?: boolean;
  search_keys?: string;
  operation?: string;
  set_status?: string;
  send_mail?: boolean;
  isOwnedBySystem?: boolean;
  AccessKeys?: any;
  action_script?: ActionScript;
  CreatedAt?: string;
  UpdatedAt?: string;
}

export interface FieldSettings {
  id?: string;
  f_id?: string;
  w_id?: string;
  p_id?: string;
  d_id?: string;
  field_csv_name?: string;
  display_name?: string;
  name?: FieldNameENJP;
  display_id?: string;
  dataType?: string;
  search?: boolean;
  show_list?: boolean;
  as_title?: boolean;
  status?: boolean;
  fieldIndex?: number;
  title_order?: number;
  full_text?: boolean;
  unique?: boolean;
  min_value?: string;
  max_value?: string;
  hideOnInput?: boolean;
  hide_from_api?: boolean;
  has_index?: boolean;
}
export interface ItemLinked {
  items?: any;
  datastore_id: string;
  stateflowActions?: ActionField;
  fields?: FieldSettings;
  column_settings: any;
}
export interface ItemDetail {
  title?: string;
  rev_no?: number;
  field_values?: any;
  status_list?: any;
  status_actions?: any;
  item_actions?: any;
  status_order?: any;
  status_action_order?: any;
  item_action_order?: any;
}

export interface LookupItem {
  created_at: string;
  created_by: string;
  d_id: string;
  i_id: string;
  p_id: string;
  rev_no: number;
  seed_i_id: string;
  status: string;
  status_id: string;
  title: string;
  updated_at: string;
  updated_by: string;
  w_id: string;
  [key: string]: any;
}

export class ItemHistoryComment {
  IsChanged: boolean;
  UserObjID: string;
  action_id: string;
  comment: string;
  created_at: string;
  datastore_id: string;
  display_order: number;
  email: string;
  history_id: string;
  i_id: string;
  is_fetchreplymail: boolean;
  is_notify: boolean;
  item_id: string;
  media_link: string;
  post_for_rel: boolean;
  post_mode: string;
  project_id: string;
  transaction_id: string;
  updated_at: string;
  user_id: string;
  username: string;
  workspace_id: string;
}

export interface DatastoreCreateCommentItem {
  history_id?: string;
  item_history?: ItemHistoryComment;
}


export interface ItemWithSearch {
  errors: [GenericAPIError];
  totalItems: number;
  items: [ItemWithSearchResItem];
  fields: any;
}


/** Data response from request graphql */
export interface DtDsItems {
  datastoreGetDatastoreItems: DsItems;
}
export interface DtItemHistories {
  getHistories: ItemHistories;
}
export interface DtItemIdCreated {
  datastoreCreateItemID: ItemID;
}
export interface DtNewItem {
  datastoreCreateNewItem: ItemNew;
}
export interface DtItemLinked {
  datastoreGetLinkedItems: ItemLinked;
}
export interface DtDeleteItem {
  datastoreDeleteItem: {
    error: any;
  };
}
export interface DtUpdateItem {
  datastoreUpdateItem: {
    error: string;
    item: {[key: string]: any};
  };
}

export interface DtExecuteItemAction {
  datastoreExecuteItemAction: {
    error: string;
    item_id?: string;
    item: {[key: string]: any};
  };
}

export interface DtItemDetail {
  getDatastoreItemDetails: ItemDetail;
}

export interface DtUpdatedItem {
  datastoreUpdateItem: any;
}

export interface DtAddItemLink {
  addItemLink: ResponseOkModel;
}
export interface DtUpdateItemLink {
  updateItemLink: ResponseOkModel;
}
export interface DtDeleteItemLink {
  deleteItemLink: ResponseOkModel;
}
export interface DtDatastoreCreateCommentItem {
  postNewItemHistory: DatastoreCreateCommentItem;
}

export interface DtDatastoreUpdateCommentItem {
  postUpdateItemHistory: ResponseErrorNull;
}

export interface DtDatastoreDeleteCommentItem {
  archiveItemHistory: ResponseErrorNull;
}

export interface DtItemWithSearch {
  itemWithSearch: ItemWithSearch;
}

/** export response */
export interface DsItemsRes {
  items?: Item[];
  error?: string;
}
export interface ItemHistoriesRes {
  itemHistories?: ItemHistories;
  error?: string;
}
export interface CreatedItemIdRes {
  item_id?: string;
  error?: string;
}
export interface NewItemRes {
  itemNew?: ItemNew;
  error?: string;
}

export interface NewItem {
  data?: ItemNew;
  error?: string;
}

export interface ItemUpdatedSuccess {
  error: string;
  itemHistory: ItemHistoryComment;
  rev_no: RevNo;
}

export interface UpdateItemRes {
  data?: ItemUpdatedSuccess;
  error?: string;
}

export interface NewItems {
  data?: NewItem[];
  error?: string[];
}

export interface ItemLinkedRes {
  itemLinked?: ItemLinked;
  error?: string;
}

export interface ItemDetailRes {
  itemDetails?: ItemDetail;
  error?: string;
}

export interface UpdatedItemRes {
  item?: any;
  error?: string;
}

export interface RevNo {
  _id: any;
  rev_no: number;
}

export interface DtUpdateItemRes {
  error?: any;
  item?: any;
  itemHistory?: ItemHistory;
  rev_no?: RevNo;
  history_id?: string;
  item_id?: string;
}

export interface DatastoreCreateCommentItemRes {
  postNewItemHistory?: DatastoreCreateCommentItem;
  error?: any;
}

export interface ItemWithSearchRes {
  items?: Item[];
  errors?: any;
}

export interface ItemWithSearchResLookupItem {
  created_at?: string;
  created_by?: string;
  d_id?: string;
  i_id?: string;
  id?: string;
  p_id?: string;
  rev_no?: number;
  seed_i_id?: string;
  status?: string;
  status_id?: string;
  title?: string;
  updated_at?: string;
  updated_by?: string;
  w_id?: string;
}

export interface ItemWithSearchResItemLinks {
  db_count?: number;
  item_count?: number;
  links?: {
    d_id?: string;
    items?: {
      i_id: string;
      type: string;
    }[];
    item_count?: number;
  }[];
}

export interface ItemWithSearchResItem {
  Status?: string;
  created_at?: string;
  created_by?: string;
  d_id?: string;
  i_id?: string;
  item_links?: ItemWithSearchResItemLinks;
  lookup_items?: {[key: string]: ItemWithSearchResLookupItem};
  p_id?: string;
  related_key?: string;
  rev_no?: number;
  seed_i_id?: string;
  status_id?: string;
  unread?: number;
  updated_at?: string;
  updated_by?: string;
  w_id?: string;
}

export interface DatastoreDeleteDatastoreItemsRes {
  datastoreDeleteDatastoreItems: {
    data?: any;
    success: boolean;
  };
}

export interface SubscriptionUpdateItem {
  actionname: string;
  comment: string;
  created_at: string;
  datastore_id: string;
  displayorder: number;
  email: string;
  file_ids: string[] | null;
  i_id: string;
  is_fetchreplymail: boolean;
  is_notify: boolean;
  ischanged: boolean;
  isnotifytosender: boolean;
  issenditemunread: boolean;
  post_for_rel: boolean;
  post_mode: string;
  project_id: string;
  user_id: string;
  user_obj_id: string;
  username: string;
  workspace_id: string;
  _id: string;
}