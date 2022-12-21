import { type } from "os";
import { ConditionBuilder, WhereConditionBuilder } from "../types/sql"
// import QueryBuilder from "./queryBuilder";
interface QueryBuilder {
  select<Fields extends T02>(columns: Fields): this
  where<Fields extends T02>(columns: Fields): this
}
// type B = F extends string = '*'
type T02 = Exclude<string | string[] | (() => void), Function>; // string | number
export default class Query implements QueryBuilder {
  // url: string
  query: ConditionBuilder;

  constructor(
    // url: string
  ) {
    // this.url = url
    this.query = {};
  }

  select<Fields extends T02>(
    columns?: Fields,
  ): this {
    // var cleanedColumns: string[] = [];
    if (typeof columns === 'string') {
      this.query.select_fields = (columns ?? '*').split(',')
    }
    if (Array.isArray(columns)) {
      this.query.select_fields = columns
    }
    // let res: ConditionBuilder = {
    //   select_fields: cleanedColumns,
    // }
    return this
  }

  where(...condition: any[]): this {
    if (condition) {
      this.query.condition = [...condition];
    }
    return this
  }

  equalTo(
    key: string,
    values: string | number,
  ) {
    let condition: WhereConditionBuilder = {};
    if (key && values) {
      condition.id = key;
      condition.search_value = values.toString().split(',');
      condition.exact_match = true;
    }
    return condition;
  }

  greaterThanOrEqualTo(
    key: string,
    values: string | number,
  ) {
    let condition: WhereConditionBuilder = {};
    if (key && values) {
      const search: (string | number | null)[] = values.toString().split(',');
      search.push(null);
      condition.id = key;
      condition.search_value = search;
    }
    return condition;
  }

  lessThan(
    key: string,
    values: string | number,
  ) {
    let condition: WhereConditionBuilder = {};
    if (key && values) {
      const search: (string | number | null)[] = values.toString().split(',');
      search.unshift(null);
      condition.id = key;
      condition.search_value = search;
    }
    return condition;
  }

}

