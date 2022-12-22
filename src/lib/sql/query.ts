import { ConditionBuilder } from '../types/sql'
import { SortOrder } from '../types/sql/input';
interface QueryBuilder {
  select<Fields extends T02>(columns: Fields): this;
  where<Fields extends T02>(columns: Fields): this;
}

type T02 = Exclude<string | string[] | (() => void), Function>; // string | number
export default class Query implements QueryBuilder {
  query: ConditionBuilder;

  constructor() {
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

    return this
  }

  where(...conditions: any): this {
    if (conditions) {
      this.query.conditions = [...conditions];
    }
    return this
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
    if (key && values) {
      conditions.id = key;
      conditions.search_value = values.toString().split(',');
      conditions.exact_match = true;
    }
    return conditions;
  }

  greaterThanOrEqualTo(
    key: string,
    values: string | number,
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};
    if (key && values) {
      const search: (string | number | null)[] = values.toString().split(',');
      search.push(null);
      conditions.id = key;
      conditions.search_value = search;
    }
    return conditions;
  }

  lessThan(
    key: string,
    values: string | number,
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};
    if (key && values) {
      const search: (string | number | null)[] = values.toString().split(',');
      search.unshift(null);
      conditions.id = key;
      conditions.search_value = search;
    }
    return conditions;
  }

  include(
    key: string,
    values: string | number,
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};
    if (key && values) {
      conditions.id = key;
      conditions.search_value = values.toString().split(',');
    }
    return conditions;
  }

  notInclude(
    key: string,
    values: string | number,
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};
    if (key && values) {
      conditions.id = key;
      conditions.search_value = values.toString().split(',');
      conditions.not_match = true;
    }
    return conditions;
  }

  inArray(
    key: string,
    values: string[] | number[],
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};
    if (key && values && values.length > 0) {
      conditions.id = key;
      conditions.search_value = values;
      conditions.exact_match = true;
    }
    return conditions;
  }

  notInArray(
    key: string,
    values: string[] | number[],
  ): ConditionBuilder {
    const conditions: ConditionBuilder = {};
    if (key && values && values.length > 0) {
      conditions.id = key;
      conditions.search_value = values;
      conditions.exact_match = true;
      conditions.not_match = true;
    }
    return conditions;
  }

  // orderBy<SortOrders extends SortOrder>(...values: SortOrders[]): this {
  //   const maps = new Map();
  //   const sortFields: ConditionBuilder = {};

  //   if (values && values.length > 0) {
  //     const listKeys = Object.keys(values);
  //     const listValues = Object.values(values);

  //     for (const value of values) {
  //       for (const key of listKeys) {
  //         maps.set(key, value[key]);
  //       }
  //     }

  //     // this.query.sort_fields = maps;
  //   }
  //   return this;
  // }

}

