import { TokenModel } from '../../util/type/response';
import { ResponseOkModel } from '../../util/type/response';
import { AuthChangeEvent, Session } from './input';
/** Data response from request graphql */
export interface DtLogin {
  login: TokenModel;
}

/** export response */
export interface ConditionBuilder {
  select_fields?: string[];
  condition?: string[] | string;
}