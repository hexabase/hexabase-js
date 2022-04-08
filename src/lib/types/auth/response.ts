import { TokenModel } from '../../util/type/response';

/** Data response from request graphql */
export interface DtLogin {
  login: TokenModel;
}

/** export response */
export interface LoginRes {
  token?: string;
  error?: string;
}