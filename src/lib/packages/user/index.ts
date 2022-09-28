import {
  USER_CONFIRMATIONS,
  USER_INFO,
  USER_PASSWORD_EXPIRY,
  USER_REGISTER
} from '../../graphql/user';
import {
  DtUserConfirm,
  DtUserInfo,
  DtUserPassEx,
  DtUserRegister,
  UserConfirmRes,
  UserInfoRes,
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
  async register(confirmationId: string): Promise<UserRegisterRes> {
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
   * function getPasswordExpire: check user password is expiry
   * @returns UserPasswordExpiryRes
   */
  async getPasswordExpire(): Promise<UserPassExRes> {
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
   * function userConfirm: get info user confirm by confirmationId
   * @param confirmationId
   * @returns UserConfirmationsRes
   */
  async userConfirm(confirmationId: string): Promise<UserConfirmRes> {
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

  /**
   * function get: get user info by token
   * @returns UserInfoRes
   */
  async get(token: string): Promise<UserInfoRes> {
    const data: UserInfoRes = {
      userInfo: undefined,
      error: undefined,
    };
    // handle call graphql
    try {
      this.client.setHeader(
        'authorization', `Bearer ${token}`
      );
      const res: DtUserInfo = await this.client.request(USER_INFO);
      data.userInfo = res.userInfo;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

}
