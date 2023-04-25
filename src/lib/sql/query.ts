import fetch from 'cross-fetch';
import { createClient } from '../../index';
import { HxbAbstract } from '../../HxbAbstract';
import { CREATE_NEW_ITEM, DATASTORE_UPDATE_ITEM, DELETE_ITEM, DELETE_ITEMS, ITEM_WITH_SEARCH } from '../graphql/item';
import { CreateNewItem, DeleteItem, DeleteItemParameter, DeleteItemsParameter, DeleteItemsParameters, GetItemsParameters, ItemWithSearchRes, NewItem, NewItemRes, NewItems, UpdateCurrentItem, UpdateItemRes, ItemWithSearch } from '../types/item';
import { ConditionBuilder, SortFields } from '../types/sql'
import { QueryParameter, SortOrder } from '../types/sql/input';
import { ModelRes } from '../util/type';
import Item from '../packages/item';

interface QueryBuilder {
  select<Fields extends T>(columns: Fields): this;
  where<Fields extends T>(columns: Fields): this;
}

type T = Exclude<string | string[] | (() => void), Function>; // string | number
export default class Query extends HxbAbstract implements QueryBuilder, PromiseLike<any> {
  query: ConditionBuilder;
  projectId?: string;
  datastoreId?: string;
  public useDisplayId = true;

  constructor(params: QueryParameter) {
    super();
    this.datastoreId = this.datastoreId ? this.datastoreId
      : params.datastoreId ? params.datastoreId
        : undefined;
    this.projectId = this.projectId ? this.projectId
      : params.projectId ? params.projectId
        : undefined;
    this.query = {};
  }

  select<Fields extends T>(
    columns?: Fields,
  ): this {
    if (typeof columns === 'string') {
      this.query.select_fields = (columns ?? '*').split(',');
    }
    if (Array.isArray(columns)) {
      this.query.select_fields = columns;
    }

    return this;
  }

  where(...conditions: any): this {
    if (conditions) {
      this.query.conditions = [...conditions];
    }

    return this;
  }

  or(...conditions: any): ConditionBuilder {
    const result: ConditionBuilder = {};

    if (conditions) {
      result.conditions = [...conditions];
      result.use_or_condition = true;
    }

    return result;
  }

  and(...conditions: any): ConditionBuilder {
    const result: ConditionBuilder = {};

    if (conditions) {
      result.conditions = [...conditions];
    }

    return result;
  }

  equalTo(
    key: string,
    values: any,
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};
    conditions.id = key;
    conditions.search_value = values.toString().split(',');
    conditions.exact_match = true;

    return conditions;
  }

  greaterThanOrEqualTo(
    key: string,
    values: string | number,
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};

    const search: (string | number | null)[] = values.toString().split(',');
    search.push(null);
    conditions.id = key;
    conditions.search_value = search;

    return conditions;
  }

  lessThan(
    key: string,
    values: string | number,
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};

    const search: (string | number | null)[] = values.toString().split(',');
    search.unshift(null);
    conditions.id = key;
    conditions.search_value = search;

    return conditions;
  }

  include(
    key: string,
    values: string | number,
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};

    conditions.id = key;
    conditions.search_value = values.toString().split(',');

    return conditions;
  }

  notInclude(
    key: string,
    values: string | number,
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};

    conditions.id = key;
    conditions.search_value = values.toString().split(',');
    conditions.not_match = true;

    return conditions;
  }

  inArray(
    key: string,
    values: string[] | number[],
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};

    conditions.id = key;
    conditions.search_value = values;
    conditions.exact_match = true;
    conditions.isArray = true;

    return conditions;
  }

  notInArray(
    key: string,
    values: string[] | number[],
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};

    conditions.id = key;
    conditions.search_value = values;
    conditions.exact_match = true;
    conditions.not_match = true;
    conditions.isArray = true;

    return conditions;
  }

  orderBy<SortOrders extends SortOrder>(values: SortOrders): this {
    const sortFields: SortFields[] = [];

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

  useProject(projectId: string) {
    this.projectId = projectId;

    return this;
  }

  useDatastore(datastoreId: string) {
    this.datastoreId = datastoreId;

    return this;
  }

  async then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): Promise<TResult1 | TResult2> {
    const parameter: any = {
      page: this.query?.page ? this?.query?.page : 1,
      per_page: this.query?.per_page ? this?.query?.per_page : 100,
    };

    this.query?.conditions?.map(v => {
      if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && v?.hasOwnProperty('isArray') && v?.isArray === true) {
        parameter[v?.id] = v?.search_value;
      }
      if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && v?.search_value?.[0] === 'true') {
        parameter[v?.id] = true;
      }
      if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && v?.search_value?.[0] === 'false') {
        parameter[v?.id] = false;
      }
      if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && !['true', 'false']?.includes(v?.search_value?.[0])) {
        parameter[v?.id] = v?.search_value?.[0];
      }
    })

    const payload: GetItemsParameters = {
      page: parameter['page'],
      per_page: parameter['per_page'],
      datastore_id: this.datastoreId,
      project_id: this.projectId,
      include_fields_data: parameter['include_fields_data'],
      omit_total_items: parameter['omit_total_items'],
      return_count_only: parameter['return_count_only'],
      use_display_id: this.useDisplayId,
    }
    const data: ItemWithSearchRes = {};

    const res = this._fetch(ITEM_WITH_SEARCH, { payload })
      .then(async (res) => {
        const json = (await res.json()).data.itemWithSearch as ItemWithSearch;
        if (!res.ok) {
          data.errors = json.errors;
          return data;
        }
        if (!json || !json.items) {
          throw new Error('No data');
        }
        data.items = json.items.map((params: any) => Item.fromJson(params) as Item);
        return data;
      });
    return res.then(onfulfilled, onrejected);
  }

  getParameter() {
    const parameter: any = {};
    this.query?.conditions?.map(v => {
      if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && v?.hasOwnProperty('isArray') && v?.isArray === true) {
        parameter[v?.id] = v?.search_value;
      }
      if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && v?.search_value?.[0] === 'true') {
        parameter[v?.id] = true;
      }
      if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && v?.search_value?.[0] === 'false') {
        parameter[v?.id] = false;
      }
      if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && !['true', 'false']?.includes(v?.search_value?.[0])) {
        parameter[v?.id] = v?.search_value?.[0];
      }
    })

    return parameter;
  }

  deleteOne<
    TResult1 = any,
    TResult2 = never,
  >(id: string, params?: DeleteItemParameter): PromiseLike<TResult1 | TResult2> {

    const parameter = this.getParameter();
    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    const payload: DeleteItem = {
      datastoreId: this.datastoreId ? this.datastoreId
        : parameter['datastore_id'] ? parameter['datastore_id']
          : "",
      projectId: this.projectId ? this.projectId
        : parameter['project_id'] ? parameter['project_id']
          : "",
      itemId: id,
      deleteItemReq: params ? {
        use_display_id: params?.useDisplayId,
        delete_linked_items: params?.deleteLinkedItems,
        target_datastores: params?.targetDatastores,
      }
        : parameter['deleteItemReq'] ? parameter['deleteItemReq']
          : {},
    }

    const res = this._fetch(DELETE_ITEM, { payload })
      .then(async (res) => {
        if (res.ok) {
          const body = await res.json();
          data.data = body?.data?.datastoreDeleteItem;
        } else {
          const error = await res.json();
          data.error = error;
        }
        return data;
      });
    return res.then();
  }

  deleteMany<
    TResult1 = any,
    TResult2 = never,
  >(params?: DeleteItemsParameter): PromiseLike<TResult1 | TResult2> {

    const parameter = this.getParameter();

    const data: ModelRes = {
      data: undefined,
      error: undefined,
    };

    const payload: DeleteItemsParameters = {
      datastoreId: this.datastoreId ? this.datastoreId
        : parameter['datastore_id'] ? parameter['datastore_id']
          : "",
      projectId: this.projectId ? this.projectId
        : parameter['project_id'] ? parameter['project_id']
          : "",
      payload: params ? {
        use_display_id: params?.use_display_id,
        conditions: params?.conditions
      }
        : {},
    }
    const res = this._fetch(DELETE_ITEMS, { payload })
      .then(async (res) => {
        if (res.ok) {
          const body = await res.json();
          data.data = body?.data?.datastoreDeleteDatastoreItems;
        } else {
          const error = await res.json();
          data.error = error;
        }
        return data;
      });
    return res.then();

  }


  insertOne<
    TResult1 = any,
    TResult2 = never,
  >(params?: any): PromiseLike<TResult1 | TResult2> {

    const parameter = this.getParameter();
    const data: NewItem = {
      data: undefined,
      error: undefined,
    };

    const payload: CreateNewItem = {
      datastoreId: this.datastoreId ? this.datastoreId
        : parameter['datastore_id'] ? parameter['datastore_id']
          : "",
      projectId: this.projectId ? this.projectId
        : parameter['project_id'] ? parameter['project_id']
          : "",
      payload: {
        item: params,
        return_item_result: true
      }
    }

    const res = this._fetch(CREATE_NEW_ITEM, { payload })
      .then(async (res) => {
        if (res.ok) {
          const body = await res.json();
          data.data = body?.data?.datastoreCreateNewItem;
        } else {
          const error = await res.json();
          data.error = error;
        }
        return data;
      });
    return res.then();
  }

  insertMany<
    TResult1 = any,
    TResult2 = never,
  >(params?: { [key: string]: any }[]): PromiseLike<any | TResult1 | TResult2> {
    return new Promise((resolve, rejects) =>
    // {
    //   console.log("Initial");
    //   if (items){
    //     console.log("resolve");
    //     resolve(items)
    //   }else{
    //     console.log("rejects");

    //     rejects(console.log("error"));
    //   }
    // }); 
    {
      // const items: NewItems = {
      //   data: [],
      //   error: [],
      // };
      // let itemsList: NewItem[] = []
      // let errors: string[] = []
      const parameter = this.getParameter();

      if (Array.isArray(params)) {
        const datastoreId = this.datastoreId ? this.datastoreId
          : parameter['datastore_id'] ? parameter['datastore_id']
            : "";
        const projectId = this.projectId ? this.projectId
          : parameter['project_id'] ? parameter['project_id']
            : "";
        let promises = []
        for (let i = 0; i < params.length; i++) {
          promises.push(this.insertItem(datastoreId, projectId, params[i]));
          // .then((i) => {
          //   itemsList.push(i)
          //   if (i.error) {
          //     errors.push(i.error)
          //   }
          // }).catch(err => {
          //   console.log(err);
          // });
        }

        // items.data = itemsList
        // items.error = errors
        const raws = Promise.all(promises);
        resolve(raws);
      }
    })
  }

  async insertItem(datastoreId: string, projectId: string, param: any): Promise<NewItem> {
    const data: NewItem = {
      data: undefined,
    };
    const payload: CreateNewItem = {
      datastoreId,
      projectId,
      payload: {
        item: param,
        return_item_result: true
      }
    }

    const res = this._fetch(CREATE_NEW_ITEM, { payload })
      .then(async (res) => {
        if (res.ok) {
          const body = await res.json();
          data.data = body?.data?.datastoreCreateNewItem;
        } else {
          const error = await res.json();
          data.error = error;
        }
        return data;
      });
    return res
  }

  updateOne<TResult1 = any, TResult2 = never>(params?: { [key: string]: any }): PromiseLike<UpdateItemRes | TResult1 | TResult2> {
    const parameter = this.getParameter();
    const data: UpdateItemRes = {
      data: undefined,
      error: undefined,
    };
    const datastoreId = this.datastoreId ? this.datastoreId : parameter['datastore_id'] ? parameter['datastore_id'] : "";
    const projectId = this.projectId ? this.projectId : parameter['project_id'] ? parameter['project_id'] : "";

    return Promise.resolve(this.updateItem(datastoreId, projectId, params));
  }

  updateMany<TResult1 = any, TResult2 = never>(params?: { [key: string]: any }[]): PromiseLike<UpdateItemRes[] | TResult1 | TResult2> {
    return new Promise((resolve) => {
      const promises = [];
      const parameter = this.getParameter();
      const data: UpdateItemRes = {
        data: undefined,
        error: undefined,
      };
      const datastoreId = this.datastoreId ? this.datastoreId : parameter['datastore_id'] ? parameter['datastore_id'] : "";
      const projectId = this.projectId ? this.projectId : parameter['project_id'] ? parameter['project_id'] : "";
      if (!Array.isArray(params)) {
        throw new Error('Params is required Array objects');
      }

      for (const i of params) {
        promises.push(this.updateItem(datastoreId, projectId, i));
      }
      const raws = Promise.all(promises);
      resolve(raws);
    })
  }

  updateItem(datastoreId: string, projectId: string, params?: { [key: string]: any }): PromiseLike<UpdateItemRes> {
    const data: UpdateItemRes = {
      data: undefined,
      error: undefined,
    };
    const itemId = params?.itemId;
    delete params?.itemId;

    if (!params?.rev_no || typeof params?.rev_no !== 'number') {
      throw new Error('rev_no required and type of rev_no is int!')
    }

    const payload: UpdateCurrentItem = {
      itemId,
      datastoreId,
      projectId,
      itemActionParameters: { ...params }
    }

    let res = this._fetch(DATASTORE_UPDATE_ITEM, { payload })
      .then(async (res) => {
        if (res.ok) {
          const body = await res.json();
          data.data = body?.data?.datastoreUpdateItem;
          if (body?.error && body?.error?.length > 0) {
            data.error = body?.error;
          }
        } else {
          const error = await res.json();
          data.error = error;
        }
        return data;
      }).catch(error => { throw new Error(`error: ${error}`) });
    return res.then();
  }

  _fetch(query: string, variables: any) {
    return fetch(Query.client.urlHxb, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Query.client.tokenHxb}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    });
  }
}
