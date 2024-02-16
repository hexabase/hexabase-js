import { HxbAbstract } from '../../../HxbAbstract';
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
  LookupItem,
} from '../../types/item';
import ItemHistory from '../itemHistory';
import ItemAction from '../itemAction';
import ItemStatus from '../itemStatus';
import StatusAction from '../statusAction';
import LinkItem from '../linkItem';
import FileObject from '../fileObject';
import { DataType } from '../../../lib/types/field';
import Action from '../action';
import ItemSubscription from '../itemSubscription/itemSubscription';

/**
 * class Item: Item class
 */
export default class Item extends HxbAbstract {
  /** @type {Datastore} Datastore */
  public datastore: Datastore;
  /** @type {string} id */
  public id: string;
  /** @type {string} statusLabel */
  public statusLabel: string;
  /** @type {string} statusId */
  public statusId: string;
  /** @type {string} title */
  public title: string;
  /** @type {Date} createdAt */
  public createdAt: Date;
  /** @type {string} createdBy */
  public createdBy: string;
  /** @type {Date} updatedAt */
  public updatedAt: Date;
  /** @type {string} updatedBy */
  public updatedBy: string;
  /** @type {string} seedItemId */
  public seedItemId: string;
  /** @type {number} revNo */
  public revNo: number;
  /** @type {number} unread */
  public unread: number;
  /** @type {boolean} pinned */
  public pinned: boolean;
  /** @type {MapType} fields */
  public fields: MapType = {};
  /** @type {ItemAction[]} actions */
  public actions: ItemAction[] = [];
  /** @type {ItemStatus[]} statuses */
  public statuses: ItemStatus[] = [];
  /** @type {StatusAction[]} _statusActions */
  public _statusActions: StatusAction[] = [];
  /** @type {string} statusOrder */
  public statusOrder: string;
  /** @type {string} statusActionOrder */
  public statusActionOrder: string;
  /** @type {string} itemActionOrder */
  public itemActionOrder: string;
  /** @type {string | ItemStatus | StatusAction} _status */
  public _status: string | ItemStatus | StatusAction;
  /** @type {StatusAction} _updateStatusAction */
  private _updateStatusAction: StatusAction;
  /** @type {boolean} _existAttachment */
  private _existAttachment = false;
  /** @type {LinkItem[]} _linkItems */
  private _linkItems: LinkItem[] = [];
  /** @type {LinkItem[]} _unlinkItems */
  private _unlinkItems: LinkItem[] = [];

  private ignoreFieldUpdate = false;

  /**
   * function set: set item field value
   * @params {string} key - field name
   * @params {any} value - field value
   * @returns {Item} - self item
   */
  public set(key: string, value: any): Item {
    switch (key) {
      case 'datastore':
        this.datastore = value as Datastore;
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
          // console.log({ params});
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
      case 'd_id':
      case 'a_id':
      case 'w_id':
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
        if (value === '' || !value) break;
        const project = this.datastore.project;
        value = value as unknown as {[key: string]: LookupItem};
        Object.keys(value).map(name => {
          const params = value[name] as LookupItem;
          const datastore = project.datastoreSync(params.d_id);
          const item = Item.fromJson({ ...{ datastore }, ...params });
          this.setFieldValue(name, item);
        });
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
        this._statusActions = Object.keys(value as any[])
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
            this.setFieldValue(fieldName, item);
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

  /**
   * function add: add item field value
   * @params {string} fieldName - field name
   * @params {any} value - field value
   * @returns {Item} - self item
   */
  public add(fieldName: string, value: any): Item {
    if (Array.isArray(value)) return this.addAll(fieldName, value);
    if (this.ignoreFieldUpdate) return this;
    const field = this.datastore.fieldSync(fieldName);
    if (!field.valid(value)) {
      throw new Error(`Invalid value ${value} for field key ${field.name} in item ${this.id}, datastore ${this.datastore.id}`);
    }
    if (this.fields[fieldName]) {
      this.fields[fieldName].push(field.value(value, { item: this })[0]);
    } else {
      this.fields[fieldName] = [field.value(value, { item: this })];
    }
    return this;
  }

  /**
   * function addAll: add item field value
   * @params {string} fieldName - field name
   * @params {any[]} values - field values
   * @returns {Item} - self item
   */
  public addAll(fieldName: string, values: any[]): Item {
    values.forEach(value => this.add(fieldName, value));
    return this;
  }

  /**
   * function setFieldValue: set item field value
   * @params {string} fieldName - field name
   * @params {any} value - field value
   * @returns {Item} - self item
   */
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

  /**
   * function get: get item field value
   * @params {string} name - field name
   * @params {T} defaultValue - default value
   * @returns {T | undefined} - field value
   */
  get<T>(name: string, defaultValue?: T): T | undefined {
    const value = this.fields[name] && this.fields[name].field ? this.fields[name].value : this.fields[name];
    if (value === undefined || value === null && defaultValue) {
      return defaultValue;
    }
    return value as T;
  }

  /**
   * static function all: get items in datastore
   * @params {GetItemsPl} params - get items params
   * @params {Datastore} datastore - datastore
   * @params {{deep?: boolean;}} options - options
   * @returns {Promise<{ items: Item[]; totalCount: number}>} - items and total count
   */
  static async all(params: GetItemsPl, datastore: Datastore, options: {
    deep?: boolean;
  } = {}): Promise<{ items: Item[]; totalCount: number}> {
    const payload = {
      getItemsParameters: params,
      datastoreId: datastore.id,
      projectId: datastore.project.id,
    };
    payload.getItemsParameters.return_number_value = true;
    payload.getItemsParameters.include_lookups = true;
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
      .map((params: any) => Item.fromJson({ ...{ datastore }, ...params}) as Item) as Item[];
    const totalCount = res.datastoreGetDatastoreItems.totalItems;
    if (options.deep) {
      await Promise.all(items.map(item => item.fetch()));
    }
    return {
      totalCount, items,
    };
  }

  /**
   * static function search: search items in datastore
   * @params {GetItemsParameters} payload - search params
   * @params {Datastore} datastore - datastore
   * @returns {Promise<Item[]>} - items
   */
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

  /**
   * static function searchWithCount: search items in datastore
   * @params {GetItemsParameters} payload - search params
   * @params {Datastore} datastore - datastore
   * @params {{deep?: boolean;}} options - options
   * @returns {Promise<{items: Item[]; totalCount: number}>} - items and total count
   */
  static async searchWithCount(
    payload: GetItemsParameters,
    datastore: Datastore,
    options: {
      deep?: boolean;
    } = {}): Promise<{items: Item[]; totalCount: number}> {
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
    await datastore.project.datastores();
    // await Promise.all(datastores.map(d => d.fields()));
    const items = res.itemWithSearch.items
      .map(params => {
        const item = Item.fromJson({ ...{ datastore }, ...params }) as Item;
        if (params.lookup_items) {
          item.set('lookup_items', params.lookup_items);
        }
        return item;
      });
    const totalCount = res.itemWithSearch.totalItems;
    if (options.deep) {
      await Promise.all(items.map(item => item.fetch()));
    }
    return {
      totalCount, items,
    };
  }

  /**
   * function createItemId: create Itemid
   * @params {Datastore} datastore - datastore
   * @returns {Promise<string>} - new item id
   */
  static async createItemId(datastore: Datastore): Promise<string> {
    const res: DtItemIdCreated = await this.request(CREATE_ITEMID, { datastoreId: datastore.id });
    return res.datastoreCreateItemID.item_id;
  }

  /**
   * function delete: delete items in datastore
   * @params {ConditionDeleteItems[]} conditions - delete conditions
   * @params {Datastore} datasstore - datastore
   * @returns {Promise<boolean>} - true if success
   */
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

  /**
   * function save: create or update item
   * @params {{comment?: string; actionName?: string; params?: any;}} - save params
   * @returns {Promise<boolean>} - true if success
   */
  async save({
    comment,
    actionName,
    params
  }: {
    comment?: string;
    actionName?: string;
    params?: any;
  } = {}): Promise<boolean> {
    if (!this.id || this.id === '') {
      await this.create({ actionName, params});
    } else {
      await this.update({ comment, actionName, params});
    }
    await this.fetch();
    await Promise.all(this._linkItems.map(linkItem => linkItem.create()));
    await Promise.all(this._unlinkItems.map(linkItem => linkItem.delete()));
    this._linkItems = [];
    this._unlinkItems = [];
    return true;
  }

  /**
   * function link: link item
   * @params {Item} item - link item
   * @returns {Item} - self item
   */
  link(item: Item): Item {
    this._linkItems.push(new LinkItem({ item: this, linkedItem: item }));
    return this;
  }

  /**
   * function unlink: unlink item
   * @params {Item} item - self item
   */
  unlink(item: Item): Item {
    this._unlinkItems.push(new LinkItem({ item: this, linkedItem: item }));
    return this;
  }

  /**
   * function create: create new item in datastore
   * @params {{ actionName?: string; params?: any;}} - create params
   * @returns {Promise<boolean>} - true if success
   */
  async create({ actionName, params}:
  {
    actionName?: string;
    params?: any;
  } = {}): Promise<boolean> {
    if (!this.datastore) throw new Error('Datastore is required');
    const action = await this.actionOrStatusAction(actionName || 'CreateItem');
    const payload: CreateNewItemPl = {
      action_id: action && action.id,
      return_item_result: true,
      is_notify_to_sender: true,
      ensure_transaction: false,
      exec_children_post_procs: true,
      item: await this.toJson(),
    };
    if (params) payload.as_params = params;
    // handle call graphql
    const res: DtNewItem = await this.request(CREATE_NEW_ITEM, {
      projectId: this.datastore.project.id,
      datastoreId: this.datastore.id,
      payload,
    });
    await this.datastore.project.datastores();
    const options: {[key: string]: any} = {};
    for (const id of Object.keys(res.datastoreCreateNewItem.item)) {
      const field = await this.datastore.field(id);
      if (!field) {
        options[id] = res.datastoreCreateNewItem.item[id];
      } else {
        options[field.displayId] = res.datastoreCreateNewItem.item[id];
      }
    };
    // Check db lookup item
    for (const key in options) {
      if (!options[key].d_id) continue;
      const datastore = this.datastore.project.datastoreSync(options[key].d_id);
      if (datastore) {
        options[key] = await datastore.item(options[key].item_id);
      }
    }
    this.sets(options);
    this._setStatus(this._status);
    if (this._existAttachment) {
      await this.update();
      this._existAttachment = false;
    }
    return true;
  }

  /**
   * function execute: execute status update action in item
   * @params {string} actionName - action name
   * @params {any} params - action params for ActionScript
   * @returns {Promise<boolean>} - true if success
   */
  async execute(actionName: string, {
    params
  }: {
    params?: any;
  } = {}): Promise<boolean> {
    const action = await this.actionOrStatusAction(actionName);
    if (!action) throw new Error(`Action ${actionName} not found`);
    const payload: ItemActionParameters = {
      rev_no: this.revNo,
      datastore_id: this.datastore.id,
      action_id: action && action.id,
      is_notify_to_sender: true,
      ensure_transaction: true,
      exec_children_post_procs: true,
      return_item_result: true,
      item: await this.toJson(),
    };
    for (const key in payload.item) {
      if (!payload.item[key]) delete payload.item[key];
    }
    if (params) payload.as_params = params;
    const res: DtExecuteItemAction = await this.request(EXECUTE_ITEM_ACTION, {
      actionId: action.id,
      datastoreId: this.datastore.id,
      itemId: this.id,
      projectId: this.datastore.project.id,
      itemActionParameters: payload
    });
    // this.sets(res.datastoreExecuteItemAction.item);
    // this._setStatus(this._status);
    await this.fetch();
    return true;
  }

  /**
   * function actionOrStatusAction: get item action or status action
   * @params {string} actionName - action name
   * @returns {ItemAction | StatusAction | Action | undefined} - action
   */
  async actionOrStatusAction(actionName: string): Promise<ItemAction | StatusAction | Action | undefined> {
    const action = await this.action(actionName);
    if (action) return action;
    const statusAction = await this._statusActions.find(a => a.displayId === actionName || a.id === actionName || a.name === actionName);
    if (statusAction) return statusAction;
  }

  /**
   * function update: update item in datastore
   * @params {{{comment?: string; actionName?: string; params?: any;}} - update params
   * @returns {Promise<boolean>} - true if success
   */
  async update({
    comment, actionName, params}: {
    comment?: string;
    actionName?: string;
    params?: any;
  } = {}): Promise<boolean> {
    const action = await this.actionOrStatusAction(actionName || 'UpdateItem');
    const payload: ItemActionParameters = {
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
      payload.history = {
        comment,
        datastore_id: this.datastore.id,
      };
    }
    if (params) payload.as_params = params;
    const res: DtUpdateItem = await this.request(DATASTORE_UPDATE_ITEM, {
      datastoreId: this.datastore.id,
      itemId: this.id,
      projectId: this.datastore.project.id,
      itemActionParameters: payload
    });
    const options: {[key: string]: any} = {};
    for (const key in res.datastoreUpdateItem.item) {
      options[key] = res.datastoreUpdateItem.item[key];
      if (!options[key] || !options[key].d_id) continue;
      const datastore = this.datastore.project.datastoreSync(options[key].d_id);
      if (datastore) {
        options[key] = await datastore.item(options[key].item_id);
      }
    }
    this.sets(options);
    this._setStatus(this._status);
    return true;
  }

  /**
   * function toJson: convert item to json for API request
   * @returns {Promise<MapType>} - json
   */
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
      if (typeof value !== 'undefined') {
        json[key] = value;
      }
    }
    return json;
  }

  /**
   * function statusActions: get status actions that can be executed
   * @returns {Promise<StatusAction[]>} - status actions
   */
  async statusActions(): Promise<StatusAction[]> {
    if (this._statusActions.length === 0) {
      await this.fetch();
    }
    return this._statusActions;
  }

  /**
   * function status: get or set status
   * @params {string?} status - status
   * @returns {string} - status
   */
  status(status?: string): string {
    if (status) {
      const statusAction = this._statusActions.find(action => action.displayId === status);
      if (!statusAction) throw new Error('Status action is not found');
      this._updateStatusAction = statusAction;
      const newStatus = this.statuses.find(s => s.id === statusAction.nextStatusId);
      if (!newStatus) throw new Error(`Status is not found ${statusAction.nextStatusId}`);
      this._setStatus(newStatus);
    }
    return (this._status as ItemStatus).displayId;
  }

  /**
   * function fetch: get item detail
   * @returns {Promise<boolean>} - true if success
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
   * function delete: delete item in datastore
   * @returns {Promise<boolean>} - true if success
   */
  async delete(): Promise<boolean> {
    if (!this.id) throw new Error('This item is not created yet.');
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

  /**
   * function action: get item action
   * @params {string} actionName - action name
   * @returns {ItemAction | Action} - action
   */
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

  /**
   * function comment: get new item history
   * @returns ItemHistory
   */
  comment(): ItemHistory {
    return new ItemHistory({ item: this });
  }

  /**
   * function _setStatus: set status
   * @params {string | ItemStatus} status - status
   * @returns {void}
   */
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
   * function histories: get items histories
   * @params {GetHistoryPl} getHistoryParamQueries - get history query params
   * @returns {Promise<ItemHistory[]>} - histories
   */
  async histories(getHistoryParamQueries?: GetHistoryPl): Promise<ItemHistory[]> {
    const res = await this.historiesWithUnread();
    return res.histories;
  }

  /**
   * function getHistories: get items histories
   * @params {GetHistoryPl} getHistoryParamQueries - get history query params
   * @returns {Promise<{ unread: number; histories: ItemHistory[]}>} - unread count and histories
   */
  async historiesWithUnread(getHistoryParamQueries?: GetHistoryPl): Promise<{ unread: number; histories: ItemHistory[]}> {
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
   * function links: get item related in datastore
   * @params { string | Datastore } linkedDatastore - linked datastore id or Datastore object
   * @returns {Promise<Item[]>} - related items
   */
  async links(linkedDatastore: string | Datastore): Promise<Item[]> {
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
    await Promise.all(items.map(item => item.fetch()));
    return items;
  }

  /**
   * function file: get file object
   * @returns FileObject
   */
  public file(): FileObject {
    return new FileObject({item: this});
  }

  /**
   * function subscribe: subscribe event
   * @param {string} event - event name
   * @param {Function} func - callback function
   */
  public async subscribe(event: string, func: (message: ItemSubscription) => void): Promise<void> {
    await Item.client.connectPubSub();
    const eventID = this.getEventName(event);
    Item.client.connection?.on(eventID, (msg: SubscriptionUpdateItem) => {
      const data = ItemSubscription.fromJson(msg) as ItemSubscription;
      // data.item = this;
      func(data);
    });
    Item.client.connection?.on('messagereceived', (msg: {[key: string]: any}) => {
      if (msg.ok === 200) return;
    });
  }

  /**
   * function unsubscribe: unsubscribe event
   * @returns {boolean} - always true
   */
  public async unsubscribe(): Promise<boolean> {
    await Item.client.closePubSub();
    return true;
  }

  /**
   * function getEventName: get subscribe event name
   * @param {string} event - event name
   * @returns {string} - subscribe event name
   */
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
