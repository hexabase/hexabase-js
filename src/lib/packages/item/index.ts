import { ModelRes } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import {
  CREATE_ITEMID,
  CREATE_NEW_ITEM,
  DATASTORE_UPDATE_ITEM,
  DELETE_ITEM,
  DS_ITEMS,
  ITEM_DETAIL,
  ITEM_HISTORIES,
  ITEM_LINKED,
  EXECUTE_ITEM_ACTION,
} from '../../graphql/item';
import {
  CreatedItemIdRes,
  CreateNewItemPl,
  DeleteItemReq,
  DsItemsRes,
  DtDeleteItem,
  DtDsItems,
  DtItemDetail,
  DtItemHistories,
  DtItemIdCreated,
  DtItemLinked,
  DtNewItem,
  DtUpdateItem,
  GetHistoryPl,
  GetItemDetailPl,
  GetItemsPl,
  ItemActionParameters,
  ItemDetailRes,
  ItemHistoriesRes,
  ItemLinkedRes,
  NewItemRes,
  DtUpdateItemRes,
} from '../../types/item';

export default class Item extends HxbAbstract {

  /**
   * function get: get items in datastore
   * @params getItemsParameters and datastoreId are requirement, projectId is option
   * @returns DsItemsRes
   */
  async get(params: GetItemsPl, datastoreId: string, projectId?: string): Promise<DsItemsRes> {
    const data: DsItemsRes = {
      dsItems: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDsItems = await this.client.request(DS_ITEMS, { getItemsParameters: params, datastoreId, projectId });

      data.dsItems = res.datastoreGetDatastoreItems;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }

    return data;
  }

  /**
   * function getHistories: get items histories
   * @params projectId, datastoreId and itemId are requirement, historyParams is option
   * @returns ItemHistoriesRes
   */
  async getHistories(projectId: string, datastoreId: string, itemId: string, historyParams?: GetHistoryPl): Promise<ItemHistoriesRes> {
    const data: ItemHistoriesRes = {
      itemHistories: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemHistories = await this.client.request(ITEM_HISTORIES, { projectId, datastoreId, itemId, getHistoryParamQueries: historyParams });

      data.itemHistories = res.getHistories;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }

    return data;
  }

  /**
   * function createItemId: create Itemid
   * @params datastoreId is requirement
   * @returns CreatedItemIdRes
   */
  async createItemId(datastoreId: string): Promise<CreatedItemIdRes> {
    const data: CreatedItemIdRes = {
      item_id: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemIdCreated = await this.client.request(CREATE_ITEMID, { datastoreId });

      data.item_id = res.datastoreCreateItemID.item_id;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }

    return data;
  }

  /**
   * function create: create new item
   * @params projectId and datastoreId is requirement, optional newItemPl
   * @returns NewItemRes
   */
  async create(projectId: string, datastoreId: string, newItemPl: CreateNewItemPl): Promise<NewItemRes> {
    const data: NewItemRes = {
      itemNew: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtNewItem = await this.client.request(CREATE_NEW_ITEM, { projectId, datastoreId, newItemActionParameters: newItemPl });

      data.itemNew = res.datastoreCreateNewItem;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }

    return data;
  }

  /**
   * function getItemRelated: get item related in datastore
   * @params datastoreId, itemId and linkedDatastoreId is requirement
   * @returns ItemLinkedRes
   */
  async getItemRelated(datastoreId: string, itemId: string, linkedDatastoreId: string): Promise<ItemLinkedRes> {
    const data: ItemLinkedRes = {
      itemLinked: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemLinked = await this.client.request(ITEM_LINKED, { datastoreId, itemId, linkedDatastoreId });

      data.itemLinked = res.datastoreGetLinkedItems;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }

    return data;
  }

  /**
   * function getItemDetail: get item detail
   * @params datastoreId, itemId is requirement. projectId, datastoreItemDetailParams are options
   * @returns ItemDetailRes
   */
  async getItemDetail(datastoreId: string, itemId: string, projectId?: string, itemDetailParams?: GetItemDetailPl): Promise<ItemDetailRes> {
    const data: ItemDetailRes = {
      itemDetails: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemDetail = await this.client.request(ITEM_DETAIL, { datastoreId, itemId, projectId, datastoreItemDetailParams: itemDetailParams });

      data.itemDetails = res.getDatastoreItemDetails;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }

    return data;
  }

  /**
   * function deleteItem: delete item in datastore
   * @params projectId, datastoreId, itemId and deleteItemReq is requirement
   * @returns ModelRes
   */
  async delete(projectId: string, datastoreId: string, itemId: string, deleteItemReq: DeleteItemReq): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDeleteItem = await this.client.request(DELETE_ITEM, { datastoreId, itemId, projectId, deleteItemReq });

      data.data = res.datastoreDeleteItem;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }

    return data;
  }

  /**
   * function update: delete item in datastore
   * @params projectId, datastoreId, itemId and itemActionParameters is requirement
   * @returns ModelRes
   */
  async update(projectId: string, datastoreId: string, itemId: string, itemActionParameters: ItemActionParameters): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUpdateItem = await this.client.request(DATASTORE_UPDATE_ITEM, { datastoreId, itemId, projectId, itemActionParameters });

      data.data = res.datastoreUpdateItem;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }

    return data;
  }

  /**
   * function execute: execute action item in datastore
   * @params projectId, datastoreId, itemId, actionId and itemActionParameters is requirement
   * @returns ModelRes
   */
  async execute(projectId: string, datastoreId: string, itemId: string, actionId: string, itemActionParameters: ItemActionParameters): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUpdateItemRes = await this.client.request(EXECUTE_ITEM_ACTION, { projectId, datastoreId, itemId, actionId, itemActionParameters });
      data.data = res.item;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }
    return data;
  }
}

