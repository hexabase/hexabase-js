import {
  POST_INVITE_USERS,
  USER_CONFIRMATIONS,
  USER_INFO,
  USER_PASSWORD_EXPIRY,
  USER_REGISTER,
  USER_REGISTER_CONFIRM
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
  UserRegisterRes,
  ConfirmationsFullInfo,
  UserRegisterConfirmRes,
  ConfirmRegisterUserPl
} from '../../types/user';

import { HxbAbstract } from '../../../HxbAbstract';
import Workspace from '../workspace';
export default class User extends HxbAbstract {
  public id: string;
  public userName: string;
  public accessKey: string;
  public email: string;
  public profilePicture: string;
  public currentWorkspace: Workspace;
  public isWorkspaceAdmin: boolean;
  public mediaLink: string;

  set(key: string, value: any): User {
    switch (key) {
      case 'user_name':
      case 'username':
        this.userName = value;
        break;
      case 'access_key':
        this.accessKey = value;
        break;
      case 'email':
        this.email = value;
        break;
      case 'user_id':
      case 'u_id':
        this.id = value;
        break;
      case 'profile_pic':
        this.profilePicture = value;
        break;
      case 'current_workspace_id':
        this.currentWorkspace = new Workspace(value);
        break;
      case 'is_ws_admin':
        this.isWorkspaceAdmin = value;
        break;
      case 'media_link':
        this.mediaLink = value;
        break;
      case 'user_roles':
        // console.log(value);
        break;
    }
    return this;
  }

  /**
   * function userRegisterAsync: get user register info by confirmationId
   * @param confirmationId
   * @returns UserRegisterRes
   */
  static async register(confirmationId: string): Promise<User> {
    // handle call graphql
    const res: DtUserRegister = await this.request(USER_REGISTER, { confirmationId });
    return new User(res.userRegister.user);
  }

  static async registerConfirm(params: ConfirmRegisterUserPl): Promise<string> {
    const res = await this.rest('post', '/api/v0/users/registration/confirm', {}, params) as {token: string};
    return res.token!;
  }

  /**
   * function getPasswordExpire: check user password is expiry
   * @returns UserPasswordExpiryRes
   */
  async passwordExpired(): Promise<boolean> {
    const res: DtUserPassEx = await this.request(USER_PASSWORD_EXPIRY);
    return res.userPasswordExpiry.is_expired;
  }

  /**
   * function userConfirm: get info user confirm by confirmationId
   * @param confirmationId
   * @returns UserConfirmationsRes
   */
  static async confirm(confirmationId: string): Promise<ConfirmationsFullInfo> {
    // handle call graphql
    const res: DtUserConfirm = await this.request(USER_CONFIRMATIONS, { confirmationId });
    return res.userConfirmations.user;
  }

  /**
   * function get: get user info by token
   * @returns UserInfoRes
   */
  static async current(): Promise<User> {
    // handle call graphql
    const res: DtUserInfo = await this.request(USER_INFO);
    const user = User.fromJson(res.userInfo) as User;
    return user;
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
