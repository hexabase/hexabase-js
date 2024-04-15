import Cookies from 'js-cookie';
import { AuthStorage } from '../../../lib/types/auth/input';

export enum PersistenceType {
  COOKIE,
  STORAGE
}

export class Persistence {
  private _storage: AuthStorage;
  private _cookie: typeof Cookies;
  public storageType: PersistenceType;

  constructor(storage: AuthStorage | typeof Cookies) {
    if ('setItem' in storage) {
      // localStorage or sessionStorage
      this.storageType = PersistenceType.STORAGE;
      this._storage = storage as AuthStorage;
    } else {
      console.log('add cookie');
      this.storageType = PersistenceType.COOKIE;
      this._cookie = storage as typeof Cookies;
    }
  }

  async set(key: string, value: string): Promise<void> {
    if (this.storageType === PersistenceType.STORAGE) {
      // LocalStorage or SessionStorage
      await this._storage?.setItem(key, value);
      return;
    }
    if (this.storageType === PersistenceType.COOKIE) {
      console.log(this._cookie);
      this._cookie?.set(key, value);
    }
  }

  async get(key: string): Promise<string | null | undefined> {
    if (this.storageType === PersistenceType.STORAGE) {
      // LocalStorage or SessionStorage
      return await this._storage?.getItem(key);
    }
    if (this.storageType === PersistenceType.COOKIE) {
      console.log(this._cookie?.get(key));
      return this._cookie?.get(key);
    }
    return null;
  }

  async remove(key: string): Promise<void> {
    if (this.storageType === PersistenceType.STORAGE) {
      // LocalStorage or SessionStorage
      await this._storage?.removeItem(key);
      return;
    }
    if (this.storageType === PersistenceType.COOKIE) {
      this._cookie?.remove(key);
      return;
    }
  }
}