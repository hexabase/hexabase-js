import { USER_INFO } from '../../graphql/user';
import { DtUserInfo, UserInfoRes } from '../../types/user';
import { HxbAbstract } from '../../../HxbAbstract';

export default class Auth extends HxbAbstract {

  /**
   * function userInfoAsync: get user info by token
   * @returns UserInfoRes
   */
  async userInfoAsync(): Promise<UserInfoRes> {
    const data: UserInfoRes = {
      userInfo: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUserInfo = await this.client.request(USER_INFO);

      data.userInfo = res.userInfo;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
}