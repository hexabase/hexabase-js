import { USER_INFO } from '../../graphql/user';
import { UserInfoRes } from '../../types/user';
import { HxbAbstract } from '../../../HxbAbstract';

export default class Auth extends HxbAbstract {

  /**
   * function hexabaseUserInfoAsync: get user info by token
   * @returns UserInfoRes
   */
  async hexabaseUserInfoAsync(): Promise<UserInfoRes> {
    return await this.client.request(USER_INFO);
  }

}