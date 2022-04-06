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

/** export response */
export interface DsItemsRes {
  dsItems?: DsItems;
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
