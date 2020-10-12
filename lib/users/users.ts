import HttpAPI from "../httpApi";
import { UserInfoResp } from "../models/users";

export class Users {

    public async userInfoAsync() {
        var userInfo = await HttpAPI.Get<UserInfoResp>(`userinfo`, {}).then(resp => { return resp });
        console.log('userinfo!')
        console.log(userInfo)
    }
}

