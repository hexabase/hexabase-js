import {
  USER_CONFIRMATIONS,
  USER_PASSWORD_EXPIRY,
  USER_REGISTER
} from '../../graphql/user';
import {
  DtUserConfirm,
  DtUserPassEx,
  DtUserRegister,
  UserConfirmRes,
  UserPassExRes,
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
    const data: UserRegisterRes = {
      userRegister: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUserRegister = await this.client.request(USER_REGISTER, { confirmationId });

      data.userRegister = res.userRegister;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function userPasswordExAsync: check user password is expiry
   * @returns UserPasswordExpiryRes
   */
  async userPasswordExAsync(): Promise<UserPassExRes> {
    const data: UserPassExRes = {
      userPassEx: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUserPassEx = await this.client.request(USER_PASSWORD_EXPIRY);

      data.userPassEx = res.userPasswordExpiry;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function userConfirmAsync: get info user confirm by confirmationId
   * @param confirmationId
   * @returns UserConfirmationsRes
   */
  async userConfirmAsync(confirmationId: string): Promise<UserConfirmRes> {
    const data: UserConfirmRes = {
      userConfirm: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUserConfirm = await this.client.request(USER_CONFIRMATIONS, { confirmationId });

      data.userConfirm = res.userConfirmations;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
}
