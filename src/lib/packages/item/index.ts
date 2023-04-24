import { ModelRes, ResponseErrorNull } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import Project from '../project';
import Datastore from '../datastore';
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
  ITEM_WITH_SEARCH,
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
  ItemWithSearchRes,
  DtItemWithSearch,
  GetItemsParameters,
} from '../../types/item';
import HexabaseClient from '../../../HexabaseClient';
import Field from '../field';
import ItemHistory from '../itemHistory';
import ItemAction from '../itemAction';
import ItemStatus from '../itemStatus';
import StatusAction from '../statusAction';

export default class Item extends HxbAbstract {
  public datastore: Datastore;
  public id: string;
  public statusLabel: string;
  public statusId: string;
  public title: string;
  public createdAt: Date;
  public createdBy: string;
  public updatedAt: Date;
  public updatedBy: string;
  public revNo: number;
  public unread: number;
  public fields: {[key: string]: {
    field: Field, value: any}
  } = {};
  public actions: ItemAction[] = [];
  public statuses: ItemStatus[] = [];
  public statusActions: StatusAction[] = [];
  public statusOrder: string;
  public statusActionOrder: string;
  public itemActionOrder: string;

  public set(key: string, value: any): Item {
    switch (key) {
      case 'datastore':
        this.datastore = value as Datastore;
        break;
      case 'a_id':
      case 'p_id':
        break;
      case 'created_at':
        this.createdAt = new Date(value);
        break;
      case 'updated_at':
        this.updatedAt = new Date(value);
        break;
      case 'rev_no':
        this.revNo = value as number;
        break;
      case 'unread':
        this.unread = value as number;
        break;
      case 'i_id':
      case 'id':
        if (value) {
          this.id = value as string;
        }
        break;
      case 'Status':
        this.statusLabel = value as string;
        break;
      case 'status_id':
        this.statusId = value as string;
        break;
      case 'title':
        this.title = value as string;
        break;
      case 'created_by':
        this.createdBy = value as string;
        break;
      case 'updated_by':
        this.updatedBy = value as string;
        break;
      case 'item_actions':
        this.actions = (value as any[])
          .map((action: any) => ItemAction.fromJson({ ...action, item: this }) as ItemAction);
        break;
      case 'status_list':
        this.statuses = (value as any[])
          .map((status: any) => ItemStatus.fromJson({ ...status, item: this }) as ItemStatus);
        break;
      case 'status_actions':
        this.statusActions = (value as any[])
          .map((statusAction: any) => StatusAction.fromJson({ ...statusAction, item: this }) as StatusAction);
        break;
      case 'status_order':
        this.statusOrder = value as string;
        break;
      case 'status_action_order':
        this.statusActionOrder = value as string;
        break;
      case 'item_action_order':
        this.itemActionOrder = value as string;
        break;
      case 'field_values':
        (value as any[]).forEach((params: any) => {
          const field = Field.fromJson({ ...params, item: this }) as Field;
          if (this.fields[field.id] && !this.fields[field.id].field) {
            this.fields[field.id].value = params.value;
          } else {
            this.fields[field.id] = {
              field, value: params.value
            };
          }
        });
        break;
      default:
        if (this.fields[key] && this.fields[key].field) {
          const field = this.fields[key].field;
          if (field.isValid(value)) {
            this.fields[key].value = value;
          } else {
            throw new Error(`Invalid value ${value} for field key ${field.id}`);
          }
        } else {
          this.fields[key] = value;
        }
    }
    return this;
  }

  /**
   * function get: get items in datastore
   * @params getItemsParameters and datastoreId are requirement, projectId is option
   * @returns DsItemsRes
   */
  static async all(params: GetItemsPl, datastore: Datastore): Promise<{ items: Item[], totalCount: number}> {
    const payload = {
      getItemsParameters: params,
      datastoreId: datastore.id,
      projectId: datastore.project.id,
    };
    // handle call graphql
    const fields = await datastore.fields();
    const res: DtDsItems = await Item.request(DS_ITEMS, payload);
    const items = res.datastoreGetDatastoreItems.items
      .map((params:any) => {
        params = Item._addFieldsToItem(params, fields);
        return Item.fromJson({ ...{ datastore }, ...params}) as Item
      });
    const totalCount = res.datastoreGetDatastoreItems.totalItems;
    return {
      totalCount, items,
    }
  }

  private static _addFieldsToItem(params: {[key: string]: any}, fields: Field[]): {[key: string]: any} {
    Object.keys(params).forEach(key => {
      const field = fields.find(f => f.id === key);
      if (field) {
        params[field.displayId] = {
          value: params[key],
          field,
        };
        delete params[key];
      }
    });
    return params;
  }

  /**
   * function createItemId: create Itemid
   * @params datastoreId is requirement
   * @returns CreatedItemIdRes
   */
  static async createItemId(datastore: Datastore): Promise<string> {
    // handle call graphql
    const res: DtItemIdCreated = await this.request(CREATE_ITEMID, { datastoreId: datastore.id });
    return res.datastoreCreateItemID.item_id;
  }

  async save(comment?: string): Promise<boolean> {
    if (!this.id) return this.create();
    return this.update(comment);
  }

  async create(): Promise<boolean> {
    if (!this.datastore) throw new Error('Datastore is required');
    const action = await this.datastore.action('new');
    const payload: CreateNewItemPl = {
      action_id: action!.id,
      return_item_result: true,
      is_notify_to_sender: true,
      ensure_transaction: false,
      exec_children_post_procs: true,
      access_key_updates: {
        overwrite: true,
        ignore_action_settings: true,
      },
      item: this.toJson(),
    };
    // handle call graphql
    const res: DtNewItem = await this.request(CREATE_NEW_ITEM, {
      projectId: this.datastore.project.id,
      datastoreId: this.datastore.id,
      payload,
    });
    const fields = await this.datastore.fields();
    const params = Item._addFieldsToItem(res.datastoreCreateNewItem.item, fields);
    this.sets(params);
    return true;
  }

  async update(comment?: string): Promise<boolean> {
    const action = await this.action('UpdateItem');
    const params: ItemActionParameters = {
      rev_no: this.revNo,
      datastore_id: this.datastore.id,
      action_id: action.id,
      is_notify_to_sender: true,
      ensure_transaction: true,
      exec_children_post_procs: true,
      return_item_result: true,
      item: this.toJson(),
    };
    if (comment) {
      params.history = {
        comment,
        datastore_id: this.datastore.id,
      }
    }
    const res: DtUpdateItem = await this.request(DATASTORE_UPDATE_ITEM, {
      datastoreId: this.datastore.id,
      itemId: this.id,
      projectId: this.datastore.project.id,
      itemActionParameters: params }
    );
    this.sets(res.datastoreUpdateItem.item);
    return true;
  }

  toJson(): {[key: string]: any} {
    const json: {[key: string]: any} = {};
    Object.keys(this.fields).forEach(key => {
      const { value, field } = this.fields[key];
      if (field.dataType === 'text') {
        json[key] = value + '';
      } else {
        json[key] = value;
      }
    });
    return json;
  }

  /**
   * function getItemDetail: get item detail
   * @params datastoreId, itemId is requirement. projectId, datastoreItemDetailParams are options
   * @returns ItemDetailRes
   */
  async getDetail(datastoreItemDetailParams?: GetItemDetailPl): Promise<boolean> {
    const params = {
      datastoreId: this.datastore.id,
      itemId: this.id,
      projectId: this.datastore.project.id,
      datastoreItemDetailParams,
    }
    // handle call graphql
    const res: DtItemDetail = await this.request(ITEM_DETAIL, params);
    this.sets(res.getDatastoreItemDetails);
    return true;
  }

  /**
   * function deleteItem: delete item in datastore
   * @params projectId, datastoreId, itemId and deleteItemReq is requirement
   * @returns ModelRes
   */
  async delete(): Promise<boolean> {
    const action = await this.action('DeleteItem');
    const params = {
      a_id: action.id,
    };
    const res: DtDeleteItem = await this.request(DELETE_ITEM, {
      datastoreId: this.datastore.id,
      itemId: this.id,
      projectId: this.datastore.project.id,
      deleteItemReq: params,
    });
    return !res.datastoreDeleteItem.error;
  }

  async action(actionName: string): Promise<ItemAction> {
    if (this.actions.length === 0) await this.getDetail();
    return this.actions.find(a => a.displayId.trim().toLowerCase() === actionName.trim().toLocaleLowerCase())!;
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
      const res: DtUpdateItemRes = await this.request(
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
      const res: DtDatastoreCreateCommentItem = await this.request(POST_NEW_ITEM_HISTORY, { payload });
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
      const res: DtDatastoreUpdateCommentItem = await this.request(POST_UPDATE_ITEM_HISTORY, { payload });
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
      const res: DtDatastoreDeleteCommentItem = await this.request(POST_DELETE_ITEM_HISTORY, { payload });
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
      const res: DtAddItemLink = await this.request(ADD_ITEM_LINK, {
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
      const res: DtUpdateItemLink = await this.request(
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
      const res: DtDeleteItemLink = await this.request(
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

  /**
   * function itemWithSearch: get item search
   * @params payload
   * @returns ItemWithSearchRes
   */
  async itemWithSearch(
    payload: GetItemsParameters,
  ): Promise<ItemWithSearchRes> {
    const data: ItemWithSearchRes = {
      items: undefined,
      errors: undefined,
    };

    // handle call graphql
    try {
      const res: DtItemWithSearch = await this.request(
        ITEM_WITH_SEARCH,
        {
          payload
        }
      );
      
      // data.items = res.itemWithSearch;
    } catch (error: any) {
      data.errors = JSON.stringify(error?.response?.errors);
    }
    return data;
  }

  /**
   * function getHistories: get items histories
   * @params projectId, datastoreId and itemId are requirement, historyParams is option
   * @returns ItemHistoriesRes
   */
  async histories(getHistoryParamQueries?: GetHistoryPl): Promise<any> {
    const res = await this.historiesWithUnread();
    return res.histories;
  }

  async historiesWithUnread(getHistoryParamQueries?: GetHistoryPl): Promise<{ unread: number, histories: ItemHistory[]}> {
    const params = {
      projectId: this.datastore.project.id,
      datastoreId: this.datastore.id,
      itemId: this.id,
      getHistoryParamQueries,
    }
    const res: DtItemHistories = await this.request(ITEM_HISTORIES, params);
    const histories = res.getHistories.histories
      .map((history: any) => ItemHistory.fromJson({...{item: this}, ...history}) as ItemHistory);
    return {
      unread: res.getHistories.unread,
      histories,
    };
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
      const res: DtItemLinked = await this.request(ITEM_LINKED, {
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
}
