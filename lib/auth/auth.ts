import Http from 'http';

import HttpAPI from '../httpApi/index';
import {UsersLoginReq, UsersLoginResp} from '../models/users';

class Auth {
    constructor() {

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
}

export default Auth;