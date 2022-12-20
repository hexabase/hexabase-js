import { UserInfo } from '../user';

export type AuthChangeEvent =
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'TOKEN_REFRESHED'
  | 'USER_UPDATED'
  | 'USER_DELETED';

export interface Session {
  token?: string;
  user?: UserInfo;
}