import {
  POST_INVITE_USERS,
  USERNAME_EXITS,
  USER_CONFIRMATIONS,
  USER_INFO,
  USER_PASSWORD_EXPIRY,
  USER_REGISTER
} from '../../graphql/user';
import {
  DtPostInviteUsersRes,
  DtUserConfirm,
  DtUserInfo,
  DtUsernameExistsRes,
  DtUserPassEx,
  DtUserRegister,
  PostInviteUsersPl,
  PostInviteUsersResp,
  UserConfirmRes,
  UserInfoRes,
  AddUserParams,
  UsernameExistsPl,
  UsernameExistsResp,
  UserPassExRes,
  UserRegisterRes
} from '../../types/user';

import { HxbAbstract } from "../../../HxbAbstract";
export default class User extends HxbAbstract {
  public id: string;
  public user_name: string;
  public access_key: string;
  public email: string;

  static fromJson(json: {[key: string]: any}): User {
		const user = new User();
		user.sets(json);
		return user;
	}

  sets(params: {[key: string]: any}): User {
    Object.keys(params).forEach(key => {
      this.set(key, params);
    });
    return this;
  }

  set(key: string, value: any): User {
    switch (key) {
      case 'user_name':
        this.user_name = value;
        break;
      case 'access_key':
        this.access_key = value;
        break;
      case 'email':
        this.email = value;
        break;
      case 'user_id':
        this.id = value;
        break;
    }
    return this;
  }

  /**
   * function userRegisterAsync: get user register info by confirmationId
   * @param confirmationId
   * @returns UserRegisterRes
   */
  async confirm(confirmationId: string): Promise<UserRegisterRes> {
    const data: UserRegisterRes = {
      userRegister: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtUserRegister = await this.request(USER_REGISTER, { confirmationId });

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
      const res: DtUserPassEx = await this.request(USER_PASSWORD_EXPIRY);

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
      const res: DtUserConfirm = await this.request(USER_CONFIRMATIONS, { confirmationId });

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
      /*
      User.gqClient.setHeader(
        'authorization', `Bearer ${token}`
      );
      */
      const res: DtUserInfo = await this.request(USER_INFO);
      data.userInfo = res.userInfo;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function add: add user to group
   * @params email is requirement
   * @returns UsernameExistsResp
   */
  async add(email: string, groupId: string, params: AddUserParams): Promise<UsernameExistsResp> {
    const data: UsernameExistsResp = {
      usernameExists: undefined,
      error: undefined,
    };

    const payload: UsernameExistsPl = {
      email: email,
      group_id: groupId,
      username: params.username,
      tmp_password: params.tmp_password,
      no_confirm_email: params.no_confirm_email,
      invitor_id: params.invitor_id,
      email_templates_id: params.email_templates_id,
      conf_email_template_id: params.conf_email_template_id,
      confirm_email_ack: params.confirm_email_ack,
      send_password_to_email: params.send_password_to_email,
      sender_address: params.sender_address,
      hostname: params.hostname,
      exclusive_w_id: params.exclusive_w_id,
      workspace_key: params.workspace_key,
      user_code: params.user_code,
      dynamic_template_data: params.dynamic_template_data
    };

    // handle call graphql
    try {
      const res: DtUsernameExistsRes = await this.request(USERNAME_EXITS, { payload });
      data.usernameExists = res?.usernameExists;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function postInviteUsers: invite user to workspace
   * @params payload is requirement
   * @returns PostInviteUsersResp
   */
  async invite(payload: PostInviteUsersPl): Promise<PostInviteUsersResp> {
    const data: PostInviteUsersResp = {
      postInviteUsers: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtPostInviteUsersRes = await this.request(POST_INVITE_USERS, { payload });

      data.postInviteUsers = res?.postInviteUsers;
    } catch (error: any) {
      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

}
