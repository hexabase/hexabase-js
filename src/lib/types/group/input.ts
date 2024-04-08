
export interface addGroupTreeRequest {
  name: string;
  display_id: string;
  parent_g_id?: string;
  disable_ui_access?: boolean;
  user_id?: string;
  workspace_id?: string;
}

export interface updateGroupRequest {
  payload: {
    id?: string;
    name: string;
    display_id?: string;
  };
  groupId: string;
}

export interface getUsersInGroupRequest {
  groupId: string;
}

export interface addUserInGroupRequest {
  current_workspace_id: string;
  email: string;
  group_id: string;
  user_code?: string;
  username: string;
}

export interface deleteGroupRequest {
  groupId: string;
}

export interface removeUserFromGroupRequest {
  group_id: string;
  user_id: string;
  workspace_id: string;
}
