import { ProfilePic } from './input';
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
    application_display_order: string;
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
