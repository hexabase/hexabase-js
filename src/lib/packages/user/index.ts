import {
  POST_INVITE_USERS,
  USER_CONFIRMATIONS,
  USER_INFO,
  USER_PASSWORD_EXPIRY,
  USER_REGISTER,
} from './graphql';
import {
  DtPostInviteUsersRes,
  DtUserConfirm,
  DtUserInfo,
  DtUserPassEx,
  DtUserRegister,
  PostInviteUsersPl,
  PostInviteUsersResp,
  ConfirmationsFullInfo,
  ConfirmRegisterUserPl,
  GetUserInfoResponse,
  UpdateUserInfoRequest,
  UploadUserProfilePictureResponse,
  DeleteUserProfilePictureResponse
} from './type';
import { Blob } from 'buffer';

import { HxbAbstract } from '../../../HxbAbstract';
import Workspace from '../workspace';
export default class User extends HxbAbstract {
  public id: string;
  public userName: string;
  public code: string;
  public accessKey: string;
  public email: string;
  public profilePicture: string;
  public currentWorkspace: Workspace;
  public isWorkspaceAdmin: boolean;
  public mediaLink: string;
  public lastLoginDatetime: Date;

  set(key: string, value: any): User {
    switch (key) {
      case 'user_name':
      case 'username':
        this.userName = value;
        break;
      case 'user_code':
        this.code = value;
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
        this.currentWorkspace = new Workspace({w_id: value});
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
      case 'user_groups':
        break;
      case 'last_login_datetime':
        if (value === null) {
          this.lastLoginDatetime = new Date(value);
        }
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

  async fetch(): Promise<User> {
    const res = await this.rest('get', '/api/v0/userinfo') as GetUserInfoResponse;
    this.sets(res);
    return this;
  }

  async save(): Promise<boolean> {
    if (!this.id) throw new Error('User id is required');
    const params: UpdateUserInfoRequest = {
      user_id: this.id,
    };
    if (this.userName) params.username = this.userName;
    if (this.code) params.user_code = this.code;
    const res = await this.rest('put', '/api/v0/userinfo', {}, params) as {error: string | null};
    if (res.error) throw new Error(res.error);
    return true;
  }

  async updatePicture(file: Blob): Promise<boolean> {
    const res = await this
      .rest('post', '/api/v0/userinfo/profilepic', {}, {file, filename: 'default.jpg'}, {binary: true}) as UploadUserProfilePictureResponse;
    if (res.code) throw new Error(res.message);
    this.set('profile_pic', `${User.client.restHxb}/api/v0/public/userinfo/profilepic/${this.id}`);
    return true;
  }

  async deletePicture(): Promise<boolean> {
    const res = await this
      .rest('delete', '/api/v0/userinfo/profilepic') as DeleteUserProfilePictureResponse;
    if (res.error) throw new Error(res.error);
    return true;
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
