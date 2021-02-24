export interface HexabaseConfig {
    email: string;
    password: string;
}

export interface UsersLoginReq {
    email: string;
    password: string;
}

export interface UsersLoginResp {
    token: string;
}

export interface UserRole {
    r_id: string;
    role_name: string;
    role_id: string;
    p_id: string;
    application_id: string;
    application_name: string;
    application_display_order: number;
}

export interface UserInfoResp {
    u_id: string;
    username: string;
    email: string;
    profile_pic: string;
    current_workspace_id: string;
    is_ws_admin: boolean;
    user_roles: UserRole[];
}

export interface JWTToken {
    exp: number;
    iat: number;
    sub: string;
    un: string;
}