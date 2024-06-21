import { HxbAbstract } from '../../HxbAbstract';
import { GetItemsParameters, GlobalSearchCategory, SearchCondition, SortField } from '../packages/item/type';
import { SearchParameter } from '../types/sql';
import { SortOrder } from '../types/sql/input';
import Item from '../packages/item';
import QueryClient from '.';
import Project from '../packages/project';
import { GlobalSearchProps } from '../packages/datastore/input';

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

  async select(columns?: string | string[], options: {
    deep?: boolean;
  } = {}): Promise<Item[]> {
    if (columns !== '*') {
      if (typeof columns === 'string') {
        this.query.select_fields = (columns ?? '*')
          .split(',').map((column) => column.trim());
      } else if (Array.isArray(columns)) {
        this.query.select_fields = columns;
      }
    }
    const { items } = await this._execute(options);
    return items;
  }

  where(conditions: SearchCondition | SearchCondition[]): this {
    if (!Array.isArray(conditions)) {
      conditions = [conditions];
    }
    this.query.conditions = [...conditions];
    return this;
  }

  order<SortOrders extends SortOrder>(values: SortOrders): this {
    const sortFields: SortField[] = [];
    const entries = Object.entries(values);
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
    const { totalCount } = await this._execute();
    return totalCount;
  }

  private async _execute(options: {
    deep?: boolean;
  } = {}): Promise<{ items: Item[]; totalCount: number}> {
    const project = await Query.client.currentWorkspace?.project(this.queryClient.projectId);
    const datastore = await project?.datastore(this.queryClient.datastoreId)!;
    const payload = this._baseParams();
    if (this.query.select_fields) {
      payload.select_fields = this.query.select_fields;
    }
    // Check use global search
    const g = this.query.conditions?.find(c => c.global) as SearchCondition | undefined;
    if (g) {
      payload.conditions = this.query.conditions?.filter(c => !c.global);
      const params: GlobalSearchProps = {
        app_id: project?.id,
        datastore_id: datastore.id,
        category: g.category as GlobalSearchCategory,
        item_search_params: payload,
      };
      return datastore.globalSearch(g.search_value as string, params);
    }
    if (this.query.conditions) {
      payload.conditions = this.query.conditions;
    }
    return Item.searchWithCount(payload, datastore, options);
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
    item.sets(params);
    await item.save();
    return item;
  }

  async update(params: MapType): Promise<Item[]> {
    this.limit(0).page(1);
    const items = await this.select();
    return Promise.all(items.map(item => this._update(item, params)));
  }

  private async _update(item: Item, params: MapType): Promise<Item> {
    item.sets(params);
    await item.save();
    return item;
  }

  async delete(): Promise<boolean> {
    this.limit(0).page(1);
    const items = await this.select();
    await Promise.all(items.map(item => item.delete()));
    return true;
  }
}

