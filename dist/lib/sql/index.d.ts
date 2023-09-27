import { HxbAbstract } from '../../HxbAbstract';
import Query from './query';
import QueryCondition from './condition';
export default class HexabaseSQL extends HxbAbstract {
    projectId: string;
    datastoreId: string;
    condition: typeof QueryCondition;
    set(key: string, value: any): HexabaseSQL;
    from(datastoreId: string): Query;
    query(): Query;
}
