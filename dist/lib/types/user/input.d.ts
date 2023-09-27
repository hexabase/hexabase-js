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
export interface AddUserParams {
    username?: string;
    tmp_password?: string;
    no_confirm_email?: boolean;
    invitor_id?: string;
    email_templates_id?: string;
    conf_email_template_id?: string;
    confirm_email_ack?: boolean;
    send_password_to_email?: boolean;
    sender_address?: string;
    hostname?: string;
    exclusive_w_id?: string;
    workspace_key?: string;
    user_code?: string;
    dynamic_template_data?: string;
}
export interface UsernameExistsPl {
    email: string;
    group_id: string;
    username?: string;
    tmp_password?: string;
    no_confirm_email?: boolean;
    invitor_id?: string;
    email_templates_id?: string;
    conf_email_template_id?: string;
    confirm_email_ack?: boolean;
    send_password_to_email?: boolean;
    sender_address?: string;
    hostname?: string;
    exclusive_w_id?: string;
    workspace_key?: string;
    user_code?: string;
    dynamic_template_data?: string;
}
export interface PostInviteUsersPl {
    domain: string;
    users: UserInvitePayload[];
}
export interface UserRegisterPl {
    confirmation_id: string;
    email: string;
    username: string;
    password: string;
    workspace: string;
}
export interface ConfirmRegisterUserPl {
    confirmation_id: string;
    email: string;
    username?: string;
    password?: string;
    workspace?: string;
    additional_info?: {
        [key: string]: any;
    };
}
