import http from 'http';
import https from 'https';

import Auth from './auth/auth';
import { UsersLoginReq, UsersLoginResp } from './models/users';
import { HxbSessionStorage } from './storage/sessionStorage';

class BaseError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
export class HexabaseSdkError extends BaseError {
  constructor(e:string) {
    super(e);
  }
}

export interface HexabaseSdkOptions {
  protocol?: string,
  host?: string,
  port?: number,
  path?: string,
  debug?: boolean
}

interface LoginRequest {
  email: string;
  password: string;
}

export class Hexabase {
    public static auth = new Auth();

    private options: HexabaseSdkOptions = {};
    constructor(options? :HexabaseSdkOptions) 
    {
        if (options !== undefined) {
        this.options = options;
        }
    }

    /**
     * @param  {UsersLoginReq} userReq
     */
    public static async initializeApp(userReq: UsersLoginReq) 
    {
        var respToken = await this.auth.loginAsync(userReq);
        HxbSessionStorage.Write('token', respToken.token);
        console.log(`users token: ${HxbSessionStorage.Read('token')} from sessionStorage`);
    }
}
