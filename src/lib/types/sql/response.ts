import { TokenModel } from '../../util/type/response';
import { SortOrder, TypeOrder } from './input';
/** Data response from request graphql */
export interface DtLogin {
  login: TokenModel;
}

export interface SortFields {
  id?: string;
  order?: TypeOrder;
}

/** export response */
export interface ConditionBuilder {
  id?: string;
  select_fields?: string[];
  sort_fields?: SortFields[];
  conditions?: Array<any>;
  search_value?: (string | number | null)[];
  exact_match?: boolean;
  use_or_condition?: boolean;
  not_match?: boolean;
  page?: number;
  per_page?: number;
  isArray?: boolean;
}