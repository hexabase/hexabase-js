import { ProfilePic } from '../../packages/user/input';

export interface UserInfo {
  username: string;
  email: string;
  profile_pic: string;
  u_id: string;
  current_workspace_id: string;
  is_ws_admin: string;
  user_roles: UserRole[];
}
export interface UserRole {
  r_id: string;
  role_name: string;
  role_id: string;
  p_id: string;
  application_id: string;
  application_name: string;
  application_display_order: string | number;
}
export interface UserInfoRegister {
  username: string;
  isElapsed: boolean;
  id: string;
  email_confirmed: boolean;
  email: string;
  confirmed: boolean;
  confirmation_id: string;
}

export interface UserRegister {
  user: UserInfoRegister;
}

export interface UserPasswordExpiry {
  is_expired: boolean;
}

export interface WorkSpaceField {
  access_key?: string;
  created_at?: string;
  disable_ui_access?: boolean;
  display_id?: string;
  g_id?: boolean;
  id?: string;
  index?: number;
  is_root?: boolean;
  name?: string;
}
export interface ConfirmationsFullInfo {
  confirmation_id?: string;
  confirmed?: boolean;
  current_workspace_id?: string;
  email?: string;
  tmp_email?: string;
  email_confirmed?: boolean;
  id?: string;
  isElapsed?: boolean;
  username?: string;
  workspace?: WorkSpaceField;
}

export interface UserConfirmations {
  user: ConfirmationsFullInfo;
}

export interface UserProfile {
  confirmed?: boolean;
  email: string;
  email_sent: boolean;
  profile_pics: ProfilePic[];
  u_id: string;
  user_code: string;
  username: string;
}

export interface UsernameExists {
  added?: boolean;
  exists?: boolean;
  user_profile?: UserProfile;
}

export interface PostInviteUsers {
  email?: string;
  stats?: number;
}

/** Data response from request graphql */
export interface DtUserInfo {
  userInfo: UserInfo;
}

export interface DtUserRegister {
  userRegister: UserRegister;
}

export interface DtUserPassEx {
  userPasswordExpiry: UserPasswordExpiry;
}

export interface DtUserConfirm {
  userConfirmations: UserConfirmations;
}

export interface DtUsernameExistsRes {
  usernameExists: UsernameExists;
}

export interface DtPostInviteUsersRes {
  postInviteUsers: PostInviteUsers[];
}

/** export response */
export interface UserInfoRes {
  userInfo?: UserInfo;
  error?: string;
}

export interface UserRegisterRes {
  userRegister?: UserRegister;
  error?: string;
}

export interface UserPassExRes {
  userPassEx?: UserPasswordExpiry;
  error?: string;
}

export interface UserConfirmRes {
  userConfirm?: UserConfirmations;
  error?: string;
}

export interface UsernameExistsResp {
  usernameExists?: UsernameExists;
  error?: string;
}

export interface PostInviteUsersResp {
  postInviteUsers?: PostInviteUsers[];
  error?: string;
}

export interface UserRegisterConfirmRes {
  token?: string;
}

export interface GetUserInfoResponse {
  u_id: string;
  username: string;
  email: string;
  profile_pic: string;
  current_workspace_id: string;
  is_ws_admin: boolean;
  user_roles: UserRole[];
  user_groups: UserGroup[];
  last_login_datetime: string;
  user_code: string;
}

export interface UserGroup {
  g_id: string;
  group_name: string;
  group_id: string;
}

export interface UpdateUserInfoRequest {
  user_id: string;
  username?: string;
  user_code?: string;
}

export interface UploadUserProfilePictureResponse {
  code: number;
  error_code: string;
  message: string;
  error?: boolean;
}

export interface DeleteUserProfilePictureResponse {
  error?: string;
}