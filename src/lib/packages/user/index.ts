import {
  USER_REGISTER
} from '../../graphql/user';
import {
  UserRegisterRes
} from '../../types/user';
import { HxbAbstract } from '../../../HxbAbstract';

export default class User extends HxbAbstract {
  /**
   * function userRegisterAsync: get user register info by confirmationId
   * @param confirmationId
   * @returns UserRegisterRes
   */
  async userRegisterAsync(confirmationId: string): Promise<UserRegisterRes> {
    return await this.client.request(USER_REGISTER, {
      varables: {
        confirmationId,
      }
    });
  }

}