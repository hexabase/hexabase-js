import {
  USER_CONFIRMATIONS,
  USER_PASSWORD_EXPIRY,
  USER_REGISTER
} from '../../graphql/user';
import {
  UserConfirmationsRes,
  UserPasswordExpiryRes,
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
      confirmationId,
    });
  }

  /**
   * function userPasswordExAsync: check user password is expiry
   * @returns UserPasswordExpiryRes
   */
  async userPasswordExAsync(): Promise<UserPasswordExpiryRes> {
    return await this.client.request(USER_PASSWORD_EXPIRY);
  }

  /**
   * function userConfirmAsync: get info user confirm by confirmationId
   * @param confirmationId
   * @returns UserConfirmationsRes
   */
  async userConfirmAsync(confirmationId: string): Promise<UserConfirmationsRes> {
    return await this.client.request(USER_CONFIRMATIONS, {
      confirmationId,
    });
  }
}
