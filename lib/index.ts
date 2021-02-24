import http from 'http';
import https from 'https';
import Applications from './applications/applications';

import Auth from './auth/auth';
import Items from './items/items';
import { HexabaseConfig, UsersLoginResp } from './models/users';
import { ServerSent } from './services/sso';
import { HxbSessionStorage } from './storage/sessionStorage';
import { Users } from './users/users';
import Workspaces from './workspaces/workspaces';

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
    public static async initializeApp(hexabaseConfig: HexabaseConfig) 
    {
        var respToken = await this.auth.hexabaseLoginAsync(hexabaseConfig);
        if(respToken.token)
        {
            HxbSessionStorage.Write('token', respToken.token);
            // console.log(`users token: ${HxbSessionStorage.Read('token')} from sessionStorage`);
        } else
        {
            console.error(`users auth could not be retrieve`)
        }
    }

    /**
     * @returns Users
     */
    public static users(): Users
    {
        return new Users();
    }

    // TODO refactor needed
    public static workspaces = (): Workspaces => new Workspaces();
    public static applications = (): Applications => new Applications();
    public static items = (): Items => new Items();
    public static serverSent = (): ServerSent => new ServerSent();
}

export { HxbSessionStorage }