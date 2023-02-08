import QueryBuilder from './query';

export default class QueryClient {
  private url: string;
  private token: string;
  constructor(url: string, token: string){
    this.url = url;
    this.token = token;
  }
  from(relation: string): QueryBuilder;
  from(relation: string): QueryBuilder {

    return new QueryBuilder(this.url, this.token);
  }

  query(): QueryBuilder;
  query(): QueryBuilder {
    return new QueryBuilder(this.url, this.token);
  }

}