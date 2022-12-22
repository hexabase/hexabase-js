import QueryBuilder from './query';

export default class QueryClient {
  from(relation: string): QueryBuilder;
  from(relation: string): QueryBuilder {

    return new QueryBuilder();
  }

  query(): QueryBuilder;
  query(): QueryBuilder {
    return new QueryBuilder();
  }

}