import { createClient } from '../../index';
import { HxbAbstract } from '../../HxbAbstract';
import { ITEM_WITH_SEARCH } from '../graphql/item';
import { DtItemWithSearch, GetItemsParameters, ItemWithSearch } from '../types/item';
import { ConditionBuilder, SortFields } from '../types/sql'
import { SortOrder } from '../types/sql/input';
interface QueryBuilder {
  select<Fields extends T02>(columns: Fields): this;
  where<Fields extends T02>(columns: Fields): this;
}

type T02 = Exclude<string | string[] | (() => void), Function>; // string | number
export default class Query extends HxbAbstract implements QueryBuilder   {
  query: ConditionBuilder;

  constructor() {
    super("url","token");
    this.query = {};
  }

  select<Fields extends T02>(
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
    values: string | number,
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
    // console.log(this.query.conditions)
    console.log("thiss", this.query)
    const payload: GetItemsParameters = {
      conditions: [],
      page: 1,
      per_page: 100,
      datastore_id:"6360dffc05cc9cb016fbc560",
      include_fields_data: true,
      omit_total_items: true, 
      project_id: "632ad81082bd898623884d2e",
      return_count_only: false,
    };
    try {
      const h = await createClient({ url: "https://hxb-graph.hexabase.com/graphql", token: "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzYwMjMzMDYsImlhdCI6MTY3NTY3NzcwNiwic3ViIjoiNjM2OWQ1ZGQyYmYzYmM3ODc5OTUxMDFiIiwidW4iOiJuZ3V5ZW4gxJHhu4dwIHRyb2FpIn0.Clz6K8OTpGFgNq10ylVOqzlOlw7b5Ea0N2j5BO58JzZjLr2ZAnRschWcLppb-Om29oXUd1hLtwrlzVT-Mys67EwaXPbmKp6TsjUZHKT1qD3dbLouBYs5Zs8OozAtTKznEQ5SRhHQ446jlPdg9gIewBLBeSlOBFTJc0T53G_zw0l6tjHhCYsliyoyE97l_Mev7gvAPyxudWCCzG2PWkEKUE00ziCJoxzX8oO-Dgkc5Y0T_JBCaICZIK0jh586NNNgEgz8JSNmwPW5OmGvfRq7aPG6Oyqe01rkygT0Qh8hE6d6N70l6zxYbMwYtbrJbfyvVImSozDo6zA1jbqkMphipQ" })
      console.log("h", h)
      const { item, error } = await h.item.itemWithSearch(payload)
      console.log("item", item)
      console.log("error", error)
      const dt: DtItemWithSearch = await this.client.request(ITEM_WITH_SEARCH);
      console.log('dt', dt)
    }
    catch (error: any) {
      console.log("error", error)
    }
    // if (this.query.select_fields?.includes("*")){
    // }

  }

  

}

