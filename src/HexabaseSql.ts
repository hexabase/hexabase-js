import QueryClient from './lib/sql/client';
import QueryBuilder from './lib/sql/query';

export class Hexabase {
  public datastore: QueryClient;
  protected rest: QueryClient;

  constructor(
  ) {
    this.datastore = new QueryClient();
    this.rest = new QueryClient();
  }

  from(relation: string): QueryBuilder {
    return this.rest.from(relation);
  }

}