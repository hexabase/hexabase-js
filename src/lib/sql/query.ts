import { createClient } from '../../index';
import { HxbAbstract } from '../../HxbAbstract';
import { ITEM_WITH_SEARCH } from '../graphql/item';
import { DtItemWithSearch, GetItemsParameters, ItemWithSearch, ItemWithSearchRes } from '../types/item';
import { ConditionBuilder, SortFields } from '../types/sql'
import { SortOrder } from '../types/sql/input';
interface QueryBuilder {
  select<Fields extends T>(columns: Fields): this;
  where<Fields extends T>(columns: Fields): this;
}

type T = Exclude<string | string[] | (() => void), Function>; // string | number
export default class Query extends HxbAbstract implements QueryBuilder {
  query: ConditionBuilder;

  constructor(url?: string, token?: string) {
    super(url ? url : "", token ? token : "");
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

  async execute() {
    const parameter: any = {
      page: this.query?.page ? this?.query?.page : 1,
      per_page: this.query?.per_page ? this?.query?.per_page : 100,
    };

    this.query?.conditions?.map(v => {
      if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && v?.hasOwnProperty('isArray') && v?.isArray === true) {
        parameter[v?.id] = v?.search_value;
      }
      // if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && v?.search_value?.[0] === 'true') {
      //   parameter[v?.id] = v?.search_value?.[0] === 'true';
      // }
      // if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && v?.search_value?.[0] === 'false') {
      //   parameter[v?.id] = v?.search_value?.[0] === 'false';
      // }
      if (v?.hasOwnProperty('id') && v?.hasOwnProperty('search_value') && !v?.hasOwnProperty('isArray') && !['true', 'false']?.includes(v?.search_value?.[0])) {
        parameter[v?.id] = v?.search_value?.[0];
      }
      if (v?.hasOwnProperty('exact_match')) {
        parameter['exact_match'] = v?.exact_match;
      }
      if (v?.hasOwnProperty('not_match')) {
        parameter['not_match'] = v?.not_match;
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

    try {
      const res: DtItemWithSearch = await this.client.request(
        ITEM_WITH_SEARCH,
        {
          payload
        }
      );
      data.item = res.itemWithSearch;
    } catch (error: any) {
      data.error = JSON.stringify(error?.response?.errors);
    }

    return data;
  }
}

