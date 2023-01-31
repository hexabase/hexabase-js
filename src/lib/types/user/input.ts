export interface UserInfoPayload {
  token: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ProfilePic {
  mediaLink?: string;
}

export interface UserRoles {
  p_id?: string;
  project_display_id?: string;
  project_display_order?: number;
  project_name?: string;
  r_id?: string;
  role_display_id?: string;
  role_name?: string;
}

export interface UserInvitePayload {
  confirmed?: boolean;
  current_workspace_id?: string;
  email: string;
  email_sent?: boolean;
  group_id?: string;
  profile_pics: [ProfilePic];
  roles?: number;
  status: number;
  u_id: string;
  user_code: string;
  user_roles?: [UserRoles];
  username: string;
}

export interface UsernameExistsPl {
  current_workspace_id: string;
  email: string;
  group_id: string;
  user_code: string;
  username: string;
}

export interface PostInviteUsersPl {
  domain: string;
  users: UserInvitePayload[];
}