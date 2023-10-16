import { ModelRes, ResponseErrorNull, ResponseOkModel } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import Project from '../project';
import Datastore from '../datastore';
import {
  CREATE_ITEMID,
  CREATE_NEW_ITEM,
  DATASTORE_UPDATE_ITEM,
  DELETE_ITEM,
  DELETE_ITEMS,
  DS_ITEMS,
  EXECUTE_ITEM_ACTION,
  ITEM_DETAIL,
  ITEM_HISTORIES,
  ITEM_LINKED,
  ITEM_WITH_SEARCH,
} from '../../graphql/item';
import { MapType } from '../../util/type';

import {
  CreateNewItemPl,
  DtDeleteItem,
  DtDsItems,
  DtItemDetail,
  DtItemHistories,
  DtItemIdCreated,
  DtItemLinked,
  DtNewItem,
  DtUpdateItem,
  GetHistoryPl,
  GetItemsPl,
  ItemActionParameters,
  DtItemWithSearch,
  GetItemsParameters,
  ConditionDeleteItems,
  DeleteItemsParameters,
  DatastoreDeleteDatastoreItemsRes,
  DtExecuteItemAction,
  SubscriptionUpdateItem,
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
import FileObject from '../fileObject';
import { DataType } from '../../../lib/types/field';
import Action from '../action';
import ItemSubscription from '../itemSubscription/itemSubscription';

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
  public seedItemId: string;
  public revNo: number;
  public unread: number;
  public pinned: boolean;
  public fields: MapType = {};
  public actions: ItemAction[] = [];
  public statuses: ItemStatus[] = [];
  public statusActions: StatusAction[] = [];
  public statusOrder: string;
  public statusActionOrder: string;
  public itemActionOrder: string;
  public _status: string | ItemStatus | StatusAction;
  private _updateStatusAction: StatusAction;
  private _existAttachment = false;

  public _linkItems: LinkItem[] = [];
  public _unlinkItems: LinkItem[] = [];
  // public _relatedItems: RelatedItem[] = [];
  private _detail = false;

  private ignoreFieldUpdate = false;

  public set(key: string, value: any): Item {
    switch (key) {
      case 'datastore':
        this.datastore = value as Datastore;
        break;
      case 'd_id':
        break;
      case 'links': {
        const project = this.datastore.project;
        (value as any[]).forEach(params => {
          const datasstore = project.datastoreSync(params.d_id);
          (params.i_ids as string[])
            .forEach(i_id => {
              const linkedItem = Item.fromJson({ datastore: datasstore, i_id: i_id });
              this._linkItems.push(new LinkItem({item: this, linkedItem, saved: true}));
            });
        });
        break;
      }
      case 'item_links': {
        if (value.item_count === 0) break;
        const project = this.datastore.project;
        (value.links as any[]).forEach(params => {
          const datastore = project.datastoreSync(params.d_id);
          (params.items as any[]).forEach(itemParams => {
            const linkedItem = Item.fromJson({ datastore, i_id: itemParams.i_id });
            this._linkItems.push(new LinkItem({item: this, linkedItem, saved: true}));
          });
        });
        break;
      }
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
      case 'w_id':
        break;
      case 'i_id':
      // case 'id':
        if (value) {
          this.id = value as string;
        }
        break;
      case 'seed_i_id':
        this.seedItemId = value as string;
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
      case 'lookup_items':
        // console.log(value);
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
          const val = value[fieldName];
          if (val.dataType === DataType.DSLOOKUP && val.value) {
            const datastore = this.datastore.project.datastoreSync(val.value.d_id);
            const params = val.value.lookup_item;
            params.datastore = datastore;
            const item = Item.fromJson(params);
            this.fields[fieldName] = item;
          } else {
            this.setFieldValue(fieldName, val.value);
          }
        });
        break;
      default:
        this.setFieldValue(key, value);
        break;
    }
    return this;
  }

  public add(fieldName: string, value: any): Item {
    if (Array.isArray(value)) return this.addAll(fieldName, value);
    if (this.ignoreFieldUpdate) return this;
    const field = this.datastore.fieldSync(fieldName);
    if (!field.valid(value)) {
      throw new Error(`Invalid value ${value} for field key ${field.name}`);
    }
    if (this.fields[fieldName]) {
      this.fields[fieldName].push(field.value(value, { item: this })[0]);
    } else {
      this.fields[fieldName] = [field.value(value, { item: this })];
    }
    return this;
  }

  public addAll(fieldName: string, values: any[]): Item {
    values.forEach(value => this.add(fieldName, value));
    return this;
  }

  public setFieldValue(fieldName: string, value: any): Item {
    if (this.ignoreFieldUpdate) return this;
    const field = this.datastore.fieldSync(fieldName);
    if (!field.valid(value)) {
      throw new Error(`Invalid value ${value} for field key ${field.name}`);
    }
    value = field.value(value, { item: this });
    if (field.dataType.toLocaleLowerCase() === 'status') {
      this._status = value;
    }
    this.fields[field.displayId] = value;
    return this;
  }

  get<T>(name: string, defaultValue?: T): T | undefined {
    const value = this.fields[name] && this.fields[name].field ? this.fields[name].value : this.fields[name];
    if (value === undefined || value === null && defaultValue) {
      return defaultValue;
    }
    if (!value) return undefined;
    return value as T;
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
    payload.getItemsParameters.return_number_value = true;
    // payload.getItemsParameters.include_lookups = true;
    payload.getItemsParameters.include_links = true;
    payload.getItemsParameters.format = 'map';
    // handle call graphql
    const res: DtDsItems = await Item.request(DS_ITEMS, payload);
    // check db link
    for (const item of res.datastoreGetDatastoreItems.items) {
      if (!item.item_links || !item.item_links.links || item.item_links.length === 0) continue;
      for (const link of item.item_links.links) {
        if (!link.d_id) continue;
        const d = await datastore.project.datastore(link.d_id);
        await d.fields();
      }
    }
    const items = res.datastoreGetDatastoreItems.items
      .map((params: any) => Item.fromJson({ ...{ datastore }, ...params}) as Item);
    const totalCount = res.datastoreGetDatastoreItems.totalItems;
    return {
      totalCount, items,
    };
  }

  static async search(payload: GetItemsParameters, datastore: Datastore): Promise<Item[]> {
    if (typeof payload.page === 'undefined') payload.page = 1;
    if (typeof payload.per_page === 'undefined') payload.per_page = 100;
    payload.include_lookups = true;
    payload.include_links = true;
    payload.return_number_value = true;
    payload.include_fields_data = true;
    payload.format = 'map';
    const res: DtItemWithSearch = await this.request(ITEM_WITH_SEARCH, { payload });
    return res.itemWithSearch.items.map((params: any) => Item.fromJson({ ...{ datastore }, ...params }) as Item);
  }

  static async searchWithCount(payload: GetItemsParameters, datastore: Datastore): Promise<{items: Item[], totalCount: number}> {
    if (typeof payload.page === 'undefined') payload.page = 1;
    if (typeof payload.per_page === 'undefined') payload.per_page = 100;
    payload.include_lookups = true;
    payload.include_links = true;
    payload.return_number_value = true;
    payload.include_fields_data = true;
    payload.format = 'map';
    payload.use_display_id = true;
    payload.datastore_id = datastore.id;
    payload.project_id = datastore.project.id;
    const res: DtItemWithSearch = await this.request(ITEM_WITH_SEARCH, { payload });
    const items = res.itemWithSearch.items.map((params: any) => Item.fromJson({ ...{ datastore }, ...params }) as Item);
    const totalCount = res.itemWithSearch.totalItems;
    return {
      totalCount, items,
    };
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

  static async delete(conditions: ConditionDeleteItems[], datasstore: Datastore): Promise<boolean> {
    const params: DeleteItemsParameters = {
      projectId: datasstore.project.id,
      datastoreId: datasstore.id,
      deleteItemsParameters: {
        use_display_id: true,
        conditions,
      }
    };
    const res: DatastoreDeleteDatastoreItemsRes = await this.request(DELETE_ITEMS, params);
    return res.datastoreDeleteDatastoreItems.success;
  }

  async save(comment?: string, actionName?: string): Promise<boolean> {
    if (!this.id || this.id === '') {
      await this.create(actionName);
    } else {
      await this.update(comment, actionName);
    }
    await this.fetch();
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

  async create(actionName: string = 'CreateItem'): Promise<boolean> {
    if (!this.datastore) throw new Error('Datastore is required');
    const action = await this.actionOrStatusAction(actionName);
    const payload: CreateNewItemPl = {
      action_id: action && action.id,
      return_item_result: true,
      is_notify_to_sender: true,
      ensure_transaction: false,
      exec_children_post_procs: true,
      item: await this.toJson(),
    };
    // handle call graphql
    const res: DtNewItem = await this.request(CREATE_NEW_ITEM, {
      projectId: this.datastore.project.id,
      datastoreId: this.datastore.id,
      payload,
    });
    if (this.datastore._fields.length === 0) await this.datastore.fields();
    const params: {[key: string]: any} = {};
    Object.keys(res.datastoreCreateNewItem.item).forEach((id) => {
      const field = this.datastore._fields.find((f) => f.id === id || f.displayId === id);
      if (!field) {
        params[id] = res.datastoreCreateNewItem.item[id];
      } else {
        params[field.displayId] = res.datastoreCreateNewItem.item[id];
      }
    });
    // Check db lookup item
    for (const key in params) {
      if (!params[key].d_id) continue;
      const datastore = this.datastore.project.datastoreSync(params[key].d_id);
      if (datastore) {
        params[key] = await datastore.item(params[key].item_id);
      }
    }
    this.sets(params);
    this._setStatus(this._status);
    if (this._existAttachment) {
      await this.update();
      this._existAttachment = false;
    }
    return true;
  }

  async execute(actionName: string): Promise<boolean> {
    const action = await this.actionOrStatusAction(actionName);
    if (!action) throw new Error(`Action ${actionName} not found`);
    const params: ItemActionParameters = {
      rev_no: this.revNo,
      datastore_id: this.datastore.id,
      action_id: action && action.id,
      is_notify_to_sender: true,
      ensure_transaction: true,
      exec_children_post_procs: true,
      return_item_result: true,
      item: await this.toJson(),
    };
    const res: DtExecuteItemAction = await this.request(EXECUTE_ITEM_ACTION, {
      actionId: action.id,
      datastoreId: this.datastore.id,
      itemId: this.id,
      projectId: this.datastore.project.id,
      itemActionParameters: params
    });
    this.sets(res.datastoreExecuteItemAction.item);
    this._setStatus(this._status);
    return true;
  }

  async actionOrStatusAction(actionName: string): Promise<ItemAction | StatusAction | Action | undefined> {
    const action = await this.action(actionName);
    if (action) return action;
    const statusAction = await this.statusActions.find(a => a.displayId === actionName || a.id === actionName || a.name === actionName);
    if (statusAction) return statusAction;
  }

  async update(comment?: string, actionName = 'UpdateItem'): Promise<boolean> {
    const action = await this.actionOrStatusAction(actionName);
    const params: ItemActionParameters = {
      rev_no: this.revNo,
      datastore_id: this.datastore.id,
      action_id: action && action.id,
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
      };
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

  async toJson(): Promise<MapType> {
    const json: MapType = {};
    for (const key in this.fields) {
      const field = this.datastore.fieldSync(key);
      if (!field) throw new Error(`Field ${key} is not found`);
      if (!this.id && field.dataType === DataType.FILE && this.fields[key] && this.fields[key].length > 0) {
        const files = this.fields[key] as FileObject[];
        const file = files.find(f => !f.id); // find new file
        if (file) {
          this._existAttachment = true;
          continue;
        }
      }
      const value = await field.convert(this.fields[key]);
      if (typeof value !== 'undefined' && this.fields[key]) {
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
    };
    // handle call graphql
    const res: DtItemDetail = await this.request(ITEM_DETAIL, params);
    // set db link
    for (const key in res.getDatastoreItemDetails.field_values) {
      const field = res.getDatastoreItemDetails.field_values[key];
      if (field.dataType !== 'dslookup' || !field.value) continue;
      await this.datastore.project.datastore(field.value.d_id);
    }
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

  async action(actionName: string): Promise<ItemAction | Action> {
    if (this.actions.length === 0) {
      if (!this.id) {
        // new item
        const actions = await this.datastore.actions();
        return actions.find(a => a.displayId.trim().toLowerCase() === actionName.trim().toLocaleLowerCase())!;
      }
      this.ignoreFieldUpdate = true;
      await this.fetch();
      this.ignoreFieldUpdate = false;
    }
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
  async histories(getHistoryParamQueries?: GetHistoryPl): Promise<ItemHistory[]> {
    const res = await this.historiesWithUnread();
    return res.histories;
  }

  async historiesWithUnread(getHistoryParamQueries?: GetHistoryPl): Promise<{ unread: number, histories: ItemHistory[]}> {
    const params = {
      projectId: this.datastore.project.id,
      datastoreId: this.datastore.id,
      itemId: this.id,
      getHistoryParamQueries,
    };
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
  async links(linkedDatastore: string | Datastore): Promise<Item[]> {
    // handle call graphql
    const res: DtItemLinked = await this.request(ITEM_LINKED, {
      datastoreId: this.datastore.id,
      itemId: this.id,
      linkedDatastoreId: typeof linkedDatastore === 'string' ? linkedDatastore : linkedDatastore.id,
    });
    if (res.datastoreGetLinkedItems.items.length === 0) return [];
    const projects = await Item.client.currentWorkspace!.projects();
    const items: Item[] = [];
    for (const params of res.datastoreGetLinkedItems.items) {
      const project = projects.find(p => p.id === params.p_id)!;
      const datastore = typeof linkedDatastore === 'string' ? await project.datastore(params.d_id) : linkedDatastore;
      items.push(await datastore.item(params.i_id));
    }
    await Promise.all(items.map((item: Item) => item.fetch()));
    return items;
  }

  public file(): FileObject {
    return new FileObject({item: this});
  }

  public async subscribe(event: string, func:(message: ItemSubscription) => void): Promise<void> {
    await Item.client.connectSse();
    const eventID = this.getEventName(event);
    Item.client.connection?.on(eventID, (msg: SubscriptionUpdateItem) => {
      const data = new ItemSubscription(msg);
      data.item = this;
      func(data);
    });
    Item.client.connection?.on('messagereceived', (msg: {[key: string]: any}) => {
      if (msg.ok === 200) return;
      console.log({ msg });
    });
    
  }

  public async unsubscribe(): Promise<boolean> {
    await Item.client.closeSse();
    return true;
  }

  public getEventName(event: string): string {
    switch (event.toUpperCase()) {
      case 'UPDATE':
        const user = Item.client.currentUser;
        return `item_view_${this.id}_${user?.id}`;
      default:
    }
    return '';
  }
}
