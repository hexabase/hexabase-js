export interface Workspace {
    archived: boolean;
    w_id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface WorkspaceResp {
    workspaces: Workspace[];
    current_workspace_id: string;
}