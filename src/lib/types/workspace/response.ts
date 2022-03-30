export interface WorkSpacesInfo {
  workspace_name: string;
  workspace_id: string;
}

export interface Workspaces {
  workspaces: [WorkSpacesInfo];
  current_workspace_id: string;
}

export interface WorkspacesRes {
  workspaces: Workspaces;
}