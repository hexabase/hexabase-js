import FilterBuilder from "./builder"
import QueryBuilder from "./query"

export default class QueryClient {
  url: string
  constructor(
    url: string,
  ) {
    this.url = url
  }
  from(relation: string): QueryBuilder
  from(relation: string): QueryBuilder{
    // const url = new URL(`${this.url}/${relation}`)
    const url = `${this.url}/${relation}`;
    return new QueryBuilder(url)
  }
  
}