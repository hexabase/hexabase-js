import { QueryParameter } from '../types/sql/input';
import QueryBuilder from './query';

export default class QueryClient {
  private url: string;
  private token: string;
  private projectId: string;
  private datastoreId: string;

  constructor(url: string, token: string){
    this.url = url;
    this.token = token;
  }
  from(collection: string): QueryBuilder;
  from(collection: string): QueryBuilder {
    this.datastoreId = collection;
    const params: QueryParameter = {
      url: this.url,
      token: this.token,
      datastoreId: collection,
      projectId: this.projectId,
    }
    return new QueryBuilder(params);
  }

  query(): QueryBuilder;
  query(): QueryBuilder {
    const params: QueryParameter = {
      url: this.url,
      token: this.token
    }
    return new QueryBuilder(params);
  }

  useProject(project: string): QueryBuilder {
    this.projectId = project;
    const params: QueryParameter = {
      url: this.url,
      token: this.token,
      projectId: project,
      datastoreId: this.datastoreId,
    }
    return new QueryBuilder(params);
  }

}