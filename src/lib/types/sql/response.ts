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

export type PostgrestError = {
  message: string
  details: string
  hint: string
  code: string
}
interface PostgrestResponseBase {
  status: number
  statusText: string
}
export interface PostgrestResponseSuccess<T> extends PostgrestResponseBase {
  error: null
  data: T
  count: number | null
}
export interface PostgrestResponseFailure extends PostgrestResponseBase {
  error: PostgrestError
  data: null
  count: null
}

// TODO: in v3:
// - remove PostgrestResponse and PostgrestMaybeSingleResponse
// - rename PostgrestSingleResponse to PostgrestResponse
export type PostgrestSingleResponse<T> =
  | PostgrestResponseSuccess<T>
  | PostgrestResponseFailure
export type PostgrestMaybeSingleResponse<T> = PostgrestSingleResponse<T | null>
export type PostgrestResponse<T> = PostgrestSingleResponse<T[]>