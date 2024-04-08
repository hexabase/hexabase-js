export interface AddUserResponse {
  added: boolean;
  exists: boolean;
  user_profile: {
    confirmed: boolean;
    email: string;
    email_sent: boolean;
    profile_pics: {
      mediaLink: string;
    }[];
    u_id: string;
    username: string;
  };
}

export interface getUsersInGroupResponse {
  getUsersInGroup: {
    members: {
      u_id: string;
      username: string;
      email: string;
      profile_pic: string;
      confirmed: boolean;
      email_sent: boolean;
      is_sv: boolean;
      user_roles: {
        r_id: string;
        role_name: string;
        role_id: string;
        p_id: string;
        application_id: string;
        application_name: string;
        application_display_order: number;
      };
      additional_info: object;
    }[];
  };
}
export interface addGroupTreeResponse {
  addGroupTree: {
    error?: string;
    groupTree_datastores_res?: object;
    group: {
      id: string;
      g_id: string;
      display_id: string;
      name: string;
      index: number;
      disable_ui_access: boolean;
      is_root: boolean;
      access_key: string;
      created_at: string;
    };
  };
}

interface FieldGroup {
  g_id: string;
  group_id: string;
  name: string;
  index: number;
}

export interface updateGroupeResponse {
  updateGroup: {
    error?: string;
    group?: FieldGroup;
    children: FieldGroup[];
    count?: number;
  };
}

export interface addUserInGroupResponse {
  addUserInGroup: {
    added: boolean;
    exists: boolean;
    user_profile?: {
      confirmed: boolean;
      email: string;
      email_sent: boolean;
      profile_pics: {
        mediaLink: string;
      }[];
      u_id: string;
      user_code: string;
      username: string;
    };
  };
}

export interface deleteGroupResponse {
  deleteGroup: {
    error?: object;
  };
}

export interface removeUserFromGroupResponse {
  removeUserFromGroup: {
    error?: object;
  };
}