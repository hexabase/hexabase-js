import { ModelRes } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import {
  CREATE_ITEMID,
  CREATE_NEW_ITEM,
  DATASTORE_UPDATE_ITEM,
  DELETE_ITEM,
  DS_ITEMS, ITEM_HISTORIES, ITEM_LINKED
} from '../../graphql/item';
import {
  CreatedItemIdRes,
  CreateNewItemPl,
  DeleteItemReq,
  DsItemsRes,
  DtDeleteItem,
  DtDsItems,
  DtItemHistories,
  DtItemIdCreated,
  DtItemLinked,
  DtNewItem,
  DtUpdateItem,
  GetHistoryPl,
  GetItemsPl,
  ItemActionParameters,
  ItemHistoriesRes,
  ItemLinkedRes,
  NewItemRes
} from '../../types/item';

export default class Item extends HxbAbstract {

  /**
   * function getItemsAsync: get items in datastore
   * @params getItemsParameters and datastoreId are requirement, projectId is option
   * @returns DsItemsRes
   */
  async getItemsAsync(getItemsParameters: GetItemsPl, datastoreId: string, projectId?: string): Promise<DsItemsRes> {
    let data: DsItemsRes = {
      dsItems: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDsItems = await this.client.request(DS_ITEMS, { getItemsParameters, datastoreId, projectId });

      data.dsItems = res.datastoreGetDatastoreItems;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getItemsHistories: get items histories
   * @params projectId, datastoreId and itemId are requirement, historyParams is option
   * @returns ItemHistoriesRes
   */
  async getItemsHistories(projectId: string, datastoreId: string, itemId: string, historyParams?: GetHistoryPl ): Promise<ItemHistoriesRes> {
    let data: ItemHistoriesRes = {
      itemHistories: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemHistories = await this.client.request(ITEM_HISTORIES, { projectId, datastoreId, itemId, getHistoryParamQueries: historyParams });

      data.itemHistories = res.getHistories;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function createItemId: create Itemid
   * @params datastoreId is requirement
   * @returns CreatedItemIdRes
   */
  async createItemId(datastoreId: string): Promise<CreatedItemIdRes> {
    let data: CreatedItemIdRes = {
      item_id: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemIdCreated = await this.client.request(CREATE_ITEMID, {datastoreId});

      data.item_id = res.datastoreCreateItemID.item_id;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function createNewItem: create new item
   * @params projectId and datastoreId is requirement, optional newItemPl
   * @returns NewItemRes
   */
  async createNewItem(projectId: string, datastoreId: string, newItemPl: CreateNewItemPl): Promise<NewItemRes> {
    let data: NewItemRes = {
      itemNew: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtNewItem = await this.client.request(CREATE_NEW_ITEM, {projectId, datastoreId, newItemActionParameters: newItemPl});

      data.itemNew = res.datastoreCreateNewItem;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getItemRelated: get item related in datastore
   * @params datastoreId, itemId and linkedDatastoreId is requirement
   * @returns ItemLinkedRes
   */
   async getItemRelated( datastoreId: string, itemId:string, linkedDatastoreId: string): Promise<ItemLinkedRes> {
    let data: ItemLinkedRes = {
      itemLinked: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemLinked = await this.client.request(ITEM_LINKED, {datastoreId, itemId, linkedDatastoreId});

      data.itemLinked = res.datastoreGetLinkedItems
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function deleteItem: delete item in datastore
   * @params projectId, datastoreId, itemId and deleteItemReq is requirement
   * @returns ModelRes
   */
   async delete( projectId: string, datastoreId: string, itemId: string, deleteItemReq: DeleteItemReq): Promise<ModelRes> {
    let data: ModelRes = {
      data: undefined,
      error: undefined,
    };


    // handle call graphql
    try {
      const res: DtDeleteItem = await this.client.request(DELETE_ITEM, {datastoreId, itemId, projectId, deleteItemReq});

      data.data = res.datastoreDeleteItem
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function update: delete item in datastore
   * @params projectId, datastoreId, itemId and itemActionParameters is requirement
   * @returns ModelRes
   */
   async update( projectId: string, datastoreId: string, itemId: string, itemActionParameters: ItemActionParameters): Promise<ModelRes> {
    let data: ModelRes = {
      data: undefined,
      error: undefined,
    };


    // handle call graphql
    try {
      const res: DtUpdateItem = await this.client.request(DATASTORE_UPDATE_ITEM, {datastoreId, itemId, projectId, itemActionParameters});

      data.data = res.datastoreUpdateItem
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

}

