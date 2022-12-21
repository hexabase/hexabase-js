import QueryClient from "./lib/sql/client";
import QueryBuilder from "./lib/sql/query";

export class Hexabase {
  // public url: string;
  public datastore: QueryClient;
  protected rest: QueryClient;

  constructor(
    // protected urlGraphql: string,
  ) {
    // this.url = urlGraphql;
    this.datastore = new QueryClient();
    this.rest = new QueryClient();
  }

  from(relation: string): QueryBuilder {
    return this.rest.from(relation);
  }

}
