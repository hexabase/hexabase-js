import fetch from 'cross-fetch';
import { createClient } from '../../index';
import { HxbAbstract } from '../../HxbAbstract';
import { CREATE_NEW_ITEM, DELETE_ITEM, DELETE_ITEMS, ITEM_WITH_SEARCH } from '../graphql/item';
import { CreateNewItem, DeleteItem, DeleteItemParameter, DeleteItemsParameter, DeleteItemsParameters, GetItemsParameters, ItemWithSearchRes, NewItem, NewItemRes, NewItems } from '../types/item';
import { ConditionBuilder, SortFields } from '../types/sql'
import { QueryParameter, SortOrder } from '../types/sql/input';
import { ModelRes } from '../util/type';
interface QueryBuilder {
  select<Fields extends T>(columns: Fields): this;
  where<Fields extends T>(columns: Fields): this;
}

type T = Exclude<string | string[] | (() => void), Function>; // string | number
export default class Query extends HxbAbstract implements QueryBuilder, PromiseLike<any> {
  query: ConditionBuilder;
  projectId?: string;
  datastoreId?: string;

  constructor(params: QueryParameter) {
    super(params.url ? params.url : "", params.token ? params.token : "");
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
    this.projectId = datastoreId;

    return this;
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: any) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
  ): PromiseLike<TResult1 | TResult2> {
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
      datastore_id: parameter['datastore_id'],
      project_id: parameter['project_id'],
      include_fields_data: parameter['include_fields_data'],
      omit_total_items: parameter['omit_total_items'],
      return_count_only: parameter['return_count_only'],
    }


    const data: ItemWithSearchRes = {
      item: undefined,
      error: undefined,
    };

    const _fetch = fetch;
    let res = _fetch(
      this.urlGraphql,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.tokenHxb}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: ITEM_WITH_SEARCH, variables: { payload: payload } })
      }
    ).then(async (res) => {
      let body = null
      let error = null

      if (res.ok) {
        const body = await res.json();
        data.item = body?.data?.itemWithSearch;
      } else {
        const error = await res.json();
        data.error = error;
      }
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

    const _fetch = fetch;
    let res = _fetch(
      this.urlGraphql,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.tokenHxb}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: DELETE_ITEM, variables: { ...payload } })
      }
    ).then(async (res) => {
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

    const _fetch = fetch;
    let res = _fetch(
      this.urlGraphql,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.tokenHxb}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: DELETE_ITEMS, variables: { ...payload } })
      }
    ).then(async (res) => {
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

    const _fetch = fetch;
    let res = _fetch(
      this.urlGraphql,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.tokenHxb}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: CREATE_NEW_ITEM, variables: { ...payload } })
      }
    ).then(async (res) => {
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
      const items: NewItems = {
        data: [],
        error: [],
      };
      let itemsList: NewItem[] = []
      let errors: string[] = []
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
          promises.push(this.insertItem(datastoreId, projectId, params[i]))
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
        resolve(promises)
      }
    })
  }

  async insertItem(datastoreId: string, projectId: string, param: any): Promise<NewItem> {
    const data: NewItem = {
      data: undefined,
      error: undefined,
    };
    const payload: CreateNewItem = {
      datastoreId,
      projectId,
      payload: {
        item: param,
        return_item_result: true
      }
    }

    const _fetch = fetch;
    const res = await _fetch(
      this.urlGraphql,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.tokenHxb}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: CREATE_NEW_ITEM, variables: { ...payload } })
      }
    ).then(async (res) => {
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

}

