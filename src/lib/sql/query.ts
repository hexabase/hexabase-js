import {ConditionBuilder} from "../types/sql"
// import QueryBuilder from "./queryBuilder";
interface QueryBuilder {
  select<Fields extends T02>(columns: Fields): this
  where<Fields extends T02>(columns: Fields): this
}
// type B = F extends string = '*'
type T02 = Exclude<string | string[] | (() => void), Function>; // string | number
export default class Query implements QueryBuilder {
  url: string
  query: ConditionBuilder
  constructor(
    url: string
  ) {
    this.url = url
    this.query = {}
  }

  select<Fields extends T02 >(
    columns?: Fields,
  ): this {
    // var cleanedColumns: string[] = [];
    if ( typeof columns === 'string') {
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

  where<Fields extends T02 >(
    columns?: Fields,
  ): this {
    var cleanedColumns: string[] = [];
    if ( typeof columns === 'string') {
      this.query.condition= (columns ?? '*').split(',')
    }
    if (Array.isArray(columns)) {
      this.query.condition = columns
    }
    // let res: ConditionBuilder = {
    //   select_fields: cleanedColumns,
    // }
    return this
  }
  
}

