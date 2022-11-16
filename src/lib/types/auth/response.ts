import { TokenModel } from '../../util/type/response';
import { ResponseOkModel } from '../../util/type/response';
import { AuthChangeEvent, Session } from './input';
/** Data response from request graphql */
export interface DtLogin {
  login: TokenModel;
}

/** export response */
export interface LoginRes {
  token?: string;
  error?: string;
}

export interface DtLogOut {
  logout: ResponseOkModel;
}

export interface Subscription {
  /**
   * The subscriber UUID. This will be set by the client.
   */
  id: string;
  /**
   * The function to call every time there is an event. eg: (eventName) => {}
   */
  callback: (event: AuthChangeEvent, session: Session) => void;
  /**
   * Call this to remove the listener.
   */
  unsubscribe: () => void;
}

export interface ApiError {
  message: string;
  status: number;
}