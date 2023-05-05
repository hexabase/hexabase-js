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
import Link from '../linkItem';
import LinkItem from '../linkItem';
import { parseCommandLine } from 'typescript';

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
  public pinned: boolean;
  public fields: {[key: string]: any} = {};
  public actions: ItemAction[] = [];
  public statuses: ItemStatus[] = [];
  public statusActions: StatusAction[] = [];
  public statusOrder: string;
  public statusActionOrder: string;
  public itemActionOrder: string;
  public _status: string | ItemStatus | StatusAction;
  private _updateStatusAction: StatusAction;

  public _linkItems: LinkItem[] = [];
  public _unlinkItems: LinkItem[] = [];
  // public _relatedItems: RelatedItem[] = [];
  private _detail = false;

  public set(key: string, value: any): Item {
    switch (key) {
      case 'datastore':
        this.datastore = value as Datastore;
        break;
      case 'd_id':
        break;
      case 'links':
        const project = this.datastore.project;
        (value as any[]).forEach(params => {
          const datasstore = new Datastore({ project, id: params.d_id });
          (params.i_ids as string[])
            .forEach(async (i_id) => {
              const linkedItem = new Item({ datastore: datasstore, id: i_id });
              this._linkItems.push(new LinkItem({item: this, linkedItem, saved: true}));
            });
        });
        break;
      case 'pinned':
        this.pinned = value as boolean;
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
        this.actions = Object.keys(value)
          .map((display_id: string) => ItemAction
            .fromJson({ ...{ display_id }, ...value[display_id], item: this }) as ItemAction);
        break;
      case 'status_list':
        this.statuses = Object.keys(value)
          .map((display_id: string) => ItemStatus
            .fromJson({ ...{ display_id }, ...value[display_id], item: this }) as ItemStatus);
        break;
      case 'status_actions':
        this.statusActions = Object.keys(value as any[])
          .map((display_id: string) => StatusAction
            .fromJson({ ...{ display_id }, ...value[display_id], item: this }) as StatusAction);
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
        Object.keys(value).forEach(fieldName => {
          this.setFieldValue(fieldName, value[fieldName].value);
        });
        break;
      default:
        this.setFieldValue(key, value);
        break;
    }
    return this;
  }

  public setFieldValue(fieldName: string, value: any): Item {
    const field = this.datastore.fieldSync(fieldName);
    if (!field.valid(value)) {
      console.log({ value });
      throw new Error(`Invalid value ${value} for field key ${field.id}`);
    }
    value = field.value(value, { item: this });
    if (field.dataType.toLocaleLowerCase() === 'status') {
      this._status = value;
    }
    this.fields[fieldName] = value;
    return this;
  }

  get(name: string): any {
    if (this.fields[name] && this.fields[name].field) {
      return this.fields[name].value;
    } else {
      return this.fields[name];
    }
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
      .map((params:any) => Item.fromJson({ ...{ datastore }, ...params}) as Item);
    const totalCount = res.datastoreGetDatastoreItems.totalItems;
    return {
      totalCount, items,
    }
  }

  static async search(payload: GetItemsParameters): Promise<Item[]> {
    if (!payload.page) payload.page = 1;
    if (!payload.per_page) payload.per_page = 100;
    payload.include_lookups = true;
    payload.include_links = true;
    payload.return_number_value = true;
    payload.include_fields_data = true;
    payload.format = 'map';
    const res: DtItemWithSearch = await this.request(ITEM_WITH_SEARCH, { payload });
    return res.itemWithSearch.items.map((params: any) => Item.fromJson(params) as Item);
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
    await (!this.id ? this.create() : this.update(comment));
    await Promise.all(this._linkItems.map(linkItem => linkItem.create()));
    await Promise.all(this._unlinkItems.map(linkItem => linkItem.delete()));
    this._linkItems = [];
    this._unlinkItems = [];
    return true;
  }

  link(item: Item): Item {
    this._linkItems.push(new LinkItem({ item: this, linkedItem: item }));
    return this;
  }

  unlink(item: Item): Item {
    this._unlinkItems.push(new LinkItem({ item: this, linkedItem: item }));
    return this;
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
      item: await this.toJson(),
    };
    // handle call graphql
    const res: DtNewItem = await this.request(CREATE_NEW_ITEM, {
      projectId: this.datastore.project.id,
      datastoreId: this.datastore.id,
      payload,
    });
    if (this.datastore._fields.length === 0) await this.datastore.fields();
    // const params = Item._addFieldsToItem(res.datastoreCreateNewItem.item, fields);
    this.sets(res.datastoreCreateNewItem.item);
    this._setStatus(this._status);
    return true;
  }

  async update(comment?: string): Promise<boolean> {
    const action = this._updateStatusAction ? this._updateStatusAction : await this.action('UpdateItem');
    const params: ItemActionParameters = {
      rev_no: this.revNo,
      datastore_id: this.datastore.id,
      action_id: action.id,
      is_notify_to_sender: true,
      ensure_transaction: true,
      exec_children_post_procs: true,
      return_item_result: true,
      item: await this.toJson(),
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
      itemActionParameters: params
    });
    this.sets(res.datastoreUpdateItem.item);
    this._setStatus(this._status);
    return true;
  }

  async toJson(): Promise<{[key: string]: any}> {
    const json: {[key: string]: any} = {};
    for (const key in this.fields) {
      const field = this.datastore.fieldSync(key);
      const value = await field.convert(this.fields[key]);
      if (typeof value !== 'undefined') {
        json[key] = value;
      }
    }
    return json;
  }

  status(status?: string): string {
    if (status) {
      const statusAction = this.statusActions.find(action => action.displayId === status);
      if (!statusAction) throw new Error('Status action is not found');
      this._updateStatusAction = statusAction;
      const newStatus = this.statuses.find(s => s.id === statusAction.nextStatusId);
      if (!newStatus) throw new Error(`Status is not found ${statusAction.nextStatusId}`);
      this._setStatus(newStatus);
    }
    return (this._status as ItemStatus).displayId;
  }

  /**
   * function getItemDetail: get item detail
   * @params datastoreId, itemId is requirement. projectId, datastoreItemDetailParams are options
   * @returns ItemDetailRes
   */
  async fetch(): Promise<boolean> {
    const params = {
      datastoreId: this.datastore.id,
      itemId: this.id,
      projectId: this.datastore.project.id,
      datastoreItemDetailParams: {
        include_lookups: true,
        use_display_id: true,
        return_number_value: true,
        format: 'map',
        include_linked_items: true,
      },
    }
    // handle call graphql
    const res: DtItemDetail = await this.request(ITEM_DETAIL, params);
    this.sets(res.getDatastoreItemDetails);
    this._setStatus(this._status);
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
    if (this.actions.length === 0) await this.fetch();
    return this.actions.find(a => a.displayId.trim().toLowerCase() === actionName.trim().toLocaleLowerCase())!;
  }

  comment(): ItemHistory {
    return new ItemHistory({ item: this });
  }

  private _setStatus(status: string | ItemStatus): void {
    if (this.statuses.length === 0) return;
    if (typeof status === 'string') {
      const statusName = Object.keys(this.fields).find(fieldName => this.datastore.fieldSync(fieldName).dataType === 'status');
      if (statusName) {
        this._status = this.statuses.find(status => status.id === this.fields[statusName])!;
      }
      delete this.fields[statusName!];
    } else {
      this._status = status;
    }
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
  async links(linkedDatastoreId: string): Promise<Item[]> {
    // handle call graphql
    const res: DtItemLinked = await this.request(ITEM_LINKED, {
      datastoreId: this.datastore.id,
      itemId: this.id,
      linkedDatastoreId,
    });
    if (res.datastoreGetLinkedItems.items.length === 0) return [];
    const projects = await Item.client.currentWorkspace!.projects();
    const items: Item[] = [];
    for (const params of res.datastoreGetLinkedItems.items) {
      const project = projects.find(p => p.id === params.p_id)!;
      const datastore = await project.datastore(linkedDatastoreId);
      items.push(new Item({ id: params.i_id, datastore }) as Item);
    }
    await Promise.all(items.map((item: Item) => item.fetch()));
    return items;
  }
}
