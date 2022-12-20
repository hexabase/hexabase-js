import QueryClient from "./lib/sql/client";
import QueryBuilder from "./lib/sql/query";

export class Hexabase {
  public url: string;
  protected rest: QueryClient;
  constructor(
    protected urlGraphql: string,
  ) {
    this.url = urlGraphql;
    this.rest = new QueryClient(urlGraphql)
  }

  from(relation: string): QueryBuilder {
    return this.rest.from(relation)
    }
}
