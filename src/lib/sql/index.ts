import { HxbAbstract } from '../../HxbAbstract';
import HexabaseClient from '../../HexabaseClient';
import { QueryParameter } from '../types/sql/input';
import Query from './query';
import QueryCondition from './condition';

export default class HexabaseSQL extends HxbAbstract {
  projectId: string;
  datastoreId: string;
  condition = QueryCondition;

  set(key: string, value: any): HexabaseSQL {
    switch (key) {
      case 'projectId':
        this.projectId = value;
        break;
      case 'datastoreId':
        this.datastoreId = value;
        break;
    }
    return this;
  }

  from(datastoreId: string): Query {
    this.set('datastoreId', datastoreId);
    return new Query({ queryClient: this });
  }

  query(): Query {
    return new Query({ queryClient: this });
  }

}