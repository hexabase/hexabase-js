import fetch from 'cross-fetch';
import { createClient } from '../../index';
import { HxbAbstract } from '../../HxbAbstract';
import { CREATE_NEW_ITEM, DATASTORE_UPDATE_ITEM, DELETE_ITEM, DELETE_ITEMS, ITEM_WITH_SEARCH } from '../graphql/item';
import { CreateNewItem, DeleteItem, DeleteItemParameter, DeleteItemsParameter, DeleteItemsParameters, GetItemsParameters, ItemWithSearchRes, NewItem, NewItemRes, NewItems, UpdateCurrentItem, UpdateItemRes, ItemWithSearch, DeleteItemReq, DtItemWithSearch, SearchCondition, ConditionDeleteItems } from '../types/item';
import { SearchParameter, SortField } from '../types/sql'
import { QueryParameter, SortOrder } from '../types/sql/input';
import { ModelRes } from '../util/type';
import Item from '../packages/item';
import QueryClient from '.';
import Datastore from '../packages/datastore';
import Project from '../packages/project';

type MapType = {[key: string]: any};

export default class Query extends HxbAbstract {
  conditions: SearchCondition = {};
  query: SearchParameter = {
    page: 1,
    per_page: 0,
  };
  queryClient: QueryClient;
  // projectId?: string;
  // datastoreId?: string;
  public useDisplayId = true;
  
  set(key: string, value: any): this {
    switch (key) {
      case 'queryClient':
        this.queryClient = value;
        break;
    }
    return this;
  }

  select(columns?: string | string[]): this {
    if (columns === '*') return this;
    if (typeof columns === 'string') {
      this.query.select_fields = (columns ?? '*').split(',').map((column) => column.trim());
    } else if (Array.isArray(columns)) {
      this.query.select_fields = columns;
    }
    return this;
  }

  where(conditions: SearchCondition | SearchCondition[]): this {
    if (!Array.isArray(conditions)) {
      conditions = [conditions];
    }
    this.query.conditions = [...conditions];
    return this;
  }

  orderBy<SortOrders extends SortOrder>(values: SortOrders): this {
    const sortFields: SortField[] = [];
    const entries = Object.entries(values)
    entries.map(([key, val]) => {
      sortFields.push({ id: key, order: val });
    });
    this.query.sort_fields = sortFields;
    return this;
  }

  limit(value: number): this {
    this.query.per_page = value;
    return this;
  }

  offset(value: number): this {
    this.query.page = value;
    return this;
  }

  perPage(value: number): this {
    this.query.per_page = value;
    return this;
  }

  page(value: number): this {
    this.query.page = value;
    return this;
  }

  async count(): Promise<number> {
    const { totalCount } = await this._execute({ return_count_only: true });
    return totalCount;
  }

  async execute(): Promise<Item[]> {
    const { items } = await this._execute();
    return items;
  }

  private async _execute(options: MapType = {}): Promise<{ items: Item[], totalCount: number}> {
    const project = await Query.client.currentWorkspace?.project(this.queryClient.projectId)
    const datastore = await project?.datastore(this.queryClient.datastoreId)!;
    const payload = this._baseParams();
    if (this.query.conditions) {
      payload.conditions = this.query.conditions;
    }
    if (this.query.select_fields) {
      payload.select_fields = this.query.select_fields;
    }
    return Item.searchWithCount(payload, datastore);
  }

  private _baseParams(): GetItemsParameters {
    return {
      page: this.query.page,
      per_page: this.query.per_page,
      datastore_id: this.queryClient.datastoreId,
      project_id: this.queryClient.projectId,
    };
  }

  async insert(params: MapType | MapType[]): Promise<Item | Item[]> {
    if (Array.isArray(params)) {
      return Promise.all((params as MapType[]).map((param: MapType) => this._insert(param)));
    }
    return this._insert(params);
  }

  private async _insert(params: MapType): Promise<Item> {
    const project = new Project({id: this.queryClient.projectId!});
    const datastore = await project.datastore(this.queryClient.datastoreId!);
    const item = await datastore.item();
    return new Promise((resolve, reject) => {
      item.sets(params);
      item.save()
        .then(() => resolve(item))
        .catch(reject);
    })
  }

  async update(params: MapType): Promise<Item[]> {
    this.limit(0).page(1);
    const items = await this.execute();
    return await Promise.all(items.map(item => this._update(item, params)));
  }

  private async _update(item: Item, params: MapType): Promise<Item> {
    return new Promise(async (resolve, reject) => {
      item.sets(params);
      item.save()
        .then(() => resolve(item))
        .catch(reject);
    })
  }

  async delete(): Promise<boolean> {
    this.limit(0).page(1);
    const items = await this.execute();
    await Promise.all(items.map(item => item.delete()));
    return true;
    /*
    const conditions: ConditionDeleteItems[] = this.query.conditions?.map((condition) => {
      return {
        id: condition.id!,
        seach_value: condition.search_value!,
      }
    }) || [];
    const project = new Project({id: this.queryClient.projectId!});
    const datastore = await project.datastore(this.queryClient.datastoreId!);
    return await Item.delete(conditions, datastore);
    */
  }
}

