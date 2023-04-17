import HexabaseClient from '../../HexabaseClient';
import { QueryParameter } from '../types/sql/input';
import Query from './query';

export default class QueryClient {
  private projectId: string;
  private datastoreId: string;

  constructor(protected client: HexabaseClient){
  }
  from(datastoreId: string): Query;
  from(datastoreId: string): Query {
    this.datastoreId = datastoreId;
    const params: QueryParameter = {
      client: this.client,
      datastoreId,
      projectId: this.projectId,
    }
    return new Query(params);
  }

  query(): Query;
  query(): Query {
    const params: QueryParameter = {
      client: this.client,
    }
    return new Query(params);
  }

  useProject(project: string): Query {
    this.projectId = project;
    const params: QueryParameter = {
      client: this.client,
      projectId: project,
      datastoreId: this.datastoreId,
    }
    return new Query(params);
  }

}