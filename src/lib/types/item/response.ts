export interface DsItems {
  items: any;
  totalItems: number;
}

/** Data response from request graphql */
export interface DtDsItems {
  datastoreGetDatastoreItems: DsItems;
}

/**export response */
export interface DsItemsRes {
  dsItems?: DsItems;
  error?: string;
}
