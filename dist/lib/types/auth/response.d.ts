import { TokenModel } from '../../util/type/response';
import { ResponseOkModel } from '../../util/type/response';
import { AuthChangeEvent, Session } from './input';
export interface DtLogin {
    login: TokenModel;
}
export interface LoginRes {
    token?: string;
    error?: string;
}
export interface DtLogOut {
    logout: ResponseOkModel;
}
export interface Subscription {
    id: string;
    callback: (event: AuthChangeEvent, session: Session) => void;
    unsubscribe: () => void;
}
export interface ApiError {
    message: string;
    status: number;
}
