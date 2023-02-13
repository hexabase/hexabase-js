import { ModelRes, ResponseErrorNull } from '../../util/type';
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
  ADD_ITEM_LINK,
  UPDATE_ITEM_LINK,
  DELETE_ITEM_LINK,
  POST_NEW_ITEM_HISTORY,
  POST_UPDATE_ITEM_HISTORY,
  POST_DELETE_ITEM_HISTORY,
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
  ItemLinkRequestInput,
  UpdateItemLinkInput,
  DtAddItemLink,
  DtUpdateItemLink,
  DtDeleteItemLink,
  CreateCommentParameters,
  CreateCommentItemsParameters,
  DtDatastoreCreateCommentItem,
  DatastoreCreateCommentItemRes,
  UpdateCommentParameters,
  UpdateCommentItemsParameters,
  ArchiveCommentItemsParameters,
  DtDatastoreUpdateCommentItem,
  DtDatastoreDeleteCommentItem,
} from '../../types/item';

export default class Item extends HxbAbstract {
  /**
   * function get: get items in datastore
   * @params getItemsParameters and datastoreId are requirement, projectId is option
   * @returns DsItemsRes
   */
  async get(
    params: GetItemsPl,
    datastoreId: string,
    projectId?: string
  ): Promise<DsItemsRes> {
    const data: DsItemsRes = {
      dsItems: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDsItems = await this.client.request(DS_ITEMS, {
        getItemsParameters: params,
        datastoreId,
        projectId,
      });

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
  async getHistories(
    projectId: string,
    datastoreId: string,
    itemId: string,
    historyParams?: GetHistoryPl
  ): Promise<ItemHistoriesRes> {
    const data: ItemHistoriesRes = {
      itemHistories: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemHistories = await this.client.request(ITEM_HISTORIES, {
        projectId,
        datastoreId,
        itemId,
        getHistoryParamQueries: historyParams,
      });

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
      const res: DtItemIdCreated = await this.client.request(CREATE_ITEMID, {
        datastoreId,
      });

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
  async create(
    projectId: string,
    datastoreId: string,
    newItemPl: CreateNewItemPl
  ): Promise<NewItemRes> {
    const data: NewItemRes = {
      itemNew: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtNewItem = await this.client.request(CREATE_NEW_ITEM, {
        projectId,
        datastoreId,
        newItemActionParameters: newItemPl,
      });

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
  async getItemRelated(
    datastoreId: string,
    itemId: string,
    linkedDatastoreId: string
  ): Promise<ItemLinkedRes> {
    const data: ItemLinkedRes = {
      itemLinked: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemLinked = await this.client.request(ITEM_LINKED, {
        datastoreId,
        itemId,
        linkedDatastoreId,
      });

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
  async getItemDetail(
    datastoreId: string,
    itemId: string,
    projectId?: string,
    itemDetailParams?: GetItemDetailPl
  ): Promise<ItemDetailRes> {
    const data: ItemDetailRes = {
      itemDetails: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemDetail = await this.client.request(ITEM_DETAIL, {
        datastoreId,
        itemId,
        projectId,
        datastoreItemDetailParams: itemDetailParams,
      });

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
  async delete(
    projectId: string,
    datastoreId: string,
    itemId: string,
    deleteItemReq: DeleteItemReq
  ): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDeleteItem = await this.client.request(DELETE_ITEM, {
        datastoreId,
        itemId,
        projectId,
        deleteItemReq,
      });

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
  async update(
    projectId: string,
    datastoreId: string,
    itemId: string,
    itemActionParameters: ItemActionParameters
  ): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUpdateItem = await this.client.request(
        DATASTORE_UPDATE_ITEM,
        { datastoreId, itemId, projectId, itemActionParameters }
      );

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
  async execute(
    projectId: string,
    datastoreId: string,
    itemId: string,
    actionId: string,
    itemActionParameters: ItemActionParameters
  ): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUpdateItemRes = await this.client.request(
        EXECUTE_ITEM_ACTION,
        { projectId, datastoreId, itemId, actionId, itemActionParameters }
      );
      data.data = res.item;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }
    return data;
  }

  /**
   * function createComment: create comment item in datastore
   * @params projectId, datastoreId, itemId and CreateCommentParameters is requirement
   * @returns DatastoreCreateCommentItemRes
   */
  async createComment(
    projectId: string,
    datastoreId: string,
    itemId: string,
    params: CreateCommentParameters): Promise<DatastoreCreateCommentItemRes> {
    const data: DatastoreCreateCommentItemRes = {
      postNewItemHistory: undefined,
      error: undefined,
    };

    const payload: CreateCommentItemsParameters = {
      workspace_id: '',
      project_id: projectId,
      datastore_id: datastoreId,
      item_id: itemId,
      post_mode: '',
      comment: params.comment,
    };

    if (params.is_send_item_unread != undefined) {
      payload.is_send_item_unread = params.is_send_item_unread;
    }

    // handle call graphql
    try {
      const res: DtDatastoreCreateCommentItem = await this.client.request(POST_NEW_ITEM_HISTORY, { payload });
      data.postNewItemHistory = res.postNewItemHistory;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }
    return data;
  }

  /**
   * function updateComment: update comment item in datastore
   * @params projectId, datastoreId, itemId , historyId and UpdateCommentParameters is requirement
   * @returns ResponseErrorNull
   */
  async updateComment(
    projectId: string,
    datastoreId: string,
    itemId: string,
    historyId: string,
    params: UpdateCommentParameters): Promise<ResponseErrorNull> {
    const data: ResponseErrorNull = {
      error: undefined,
    };

    const payload: UpdateCommentItemsParameters = {
      p_id: projectId,
      d_id: datastoreId,
      i_id: itemId,
      h_id: historyId,
      comment: params.comment,
    };

    // handle call graphql
    try {
      const res: DtDatastoreUpdateCommentItem = await this.client.request(POST_UPDATE_ITEM_HISTORY, { payload });
      data.error = res.postUpdateItemHistory;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }
    return data;
  }

  /**
   * function deleteComment: delete comment item in datastore
   * @params projectId, datastoreId, itemId , historyId
   * @returns ResponseErrorNull
   */
  async deleteComment(
    projectId: string,
    datastoreId: string,
    itemId: string,
    historyId: string
  ): Promise<ResponseErrorNull> {
    const data: ResponseErrorNull = {
      error: undefined,
    };

    const payload: ArchiveCommentItemsParameters = {
      p_id: projectId,
      d_id: datastoreId,
      i_id: itemId,
      h_id: historyId,
    };

    // handle call graphql
    try {
      const res: DtDatastoreDeleteCommentItem = await this.client.request(POST_DELETE_ITEM_HISTORY, { payload });
      data.error = res.archiveItemHistory;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }
    return data;
  }

  /**
   * function createLink: create item link in datastore
   * @params datastoreId, itemId, itemLinkRequestInput, projectId are required
   * @returns ModelRes
   */
  async createLink(
    projectId: string,
    datastoreId: string,
    itemId: string,
    itemLinkRequestInput: ItemLinkRequestInput
  ): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtAddItemLink = await this.client.request(ADD_ITEM_LINK, {
        projectId,
        datastoreId,
        itemId,
        itemLinkRequestInput,
      });
      data.data = res.addItemLink;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }
    return data;
  }

  /**
   * function updateLink: update item link in datastore
   * @params datastoreId, itemId, projectId, updateItemLinkInput are required
   * @returns ModelRes
   */
  async updateLink(
    projectId: string,
    datastoreId: string,
    itemId: string,
    updateItemLinkInput: UpdateItemLinkInput
  ): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUpdateItemLink = await this.client.request(
        UPDATE_ITEM_LINK,
        {
          projectId,
          datastoreId,
          itemId,
          updateItemLinkInput,
        }
      );
      data.data = res.updateItemLink;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }
    return data;
  }

  /**
   * function deleteLink: delete item link in datastore
   * @params datastoreId, itemId, projectId, itemLinkRequestInput are required
   * @returns ModelRes
   */
  async deleteLink(
    projectId: string,
    datastoreId: string,
    itemId: string,
    itemLinkRequestInput: ItemLinkRequestInput
  ): Promise<ModelRes> {
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtDeleteItemLink = await this.client.request(
        DELETE_ITEM_LINK,
        {
          projectId,
          datastoreId,
          itemId,
          itemLinkRequestInput,
        }
      );
      data.data = res.deleteItemLink;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }
    return data;
  }
}
