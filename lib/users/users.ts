import HttpAPI from "../httpApi";
import { UserInfoResp } from "../models/index";

export class Users {
    /**
     * return user basic informations
     * @returns Promise
     */
    public async userInfoAsync(): Promise<UserInfoResp> {
        return await HttpAPI.Get<UserInfoResp>(`userinfo`, {}).then(resp => { return resp });
    }
}

