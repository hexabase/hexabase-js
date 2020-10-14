import Http from 'http';

import HttpAPI from '../httpApi/index';
import {HexabaseConfig, UsersLoginReq, UsersLoginResp} from '../models/users';

class Auth {
    constructor() {
    }
    /**
     * @param  {HexabaseConfig} payload
     * @returns Promise
     */
    public async hexabaseLoginAsync(payload: HexabaseConfig): Promise<UsersLoginResp> {
        return HttpAPI.Post<UsersLoginResp>(`login`, payload).then(
            resp => { return resp; }
        );
    }

    /**
     * @param  {UsersLoginReq} payload
     * @returns Promise
     */
    public async loginAsync(payload: UsersLoginReq): Promise<UsersLoginResp> {
        return HttpAPI.Post<UsersLoginResp>(`login`, payload).then(
            resp => { return resp; }
        );
    }
    /**
     * get temporary token
     * @returns Promise
     */
    public async getTokenAsync(): Promise<UsersLoginResp> {
        return await HttpAPI.Post<UsersLoginResp>(`token`, null).then(resp => resp);
    }
}

export default Auth;