import { TokenModel } from '../../util/type/response';
import { SortOrder, TypeOrder } from './input';
/** Data response from request graphql */
export interface DtLogin {
  login: TokenModel;
}

/** export response */
export interface ConditionBuilder {
  select_fields?: string[];
  sort_fields?: SortOrder[];
  conditions?: Array<any>;
  id?: string;
  search_value?: (string | number | null)[];
  exact_match?: boolean;
  use_or_condition?: boolean;
  not_match?: boolean;
  order?: TypeOrder;
}