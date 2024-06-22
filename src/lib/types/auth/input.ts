import { UserInfo } from '../../packages/user/type';

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

export interface AuthStorage {
  setItem(key: string, value: string): void | Promise<void>;
  getItem(key: string): string | null | Promise<string> | Promise<null>;
  removeItem(key: string): void | Promise<void>;
}
