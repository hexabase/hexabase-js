import HttpAPI from "../httpApi";
import { SetWorkspaceReq, WorkspaceResp } from "../models/workspaces";

export default class Workspaces {
    
    /**
     * get workspaces list
     * @returns Promise
     */
    public async getWorkspacesAsync(): Promise<WorkspaceResp> {
        return HttpAPI.Get<WorkspaceResp>(`workspaces`, {}).then(resp => resp);
    }

    /**
     * set the current user workspace by workspace_id
     * @param  {SetWorkspaceReq} setWorkspaceReq
     * @returns Promise
     */
    public async setCurrentWorkspace(setWorkspaceReq: SetWorkspaceReq): Promise<object> {
        return HttpAPI.Post<object>(`/workspaces/${setWorkspaceReq.workspace_id}/select`, setWorkspaceReq).then(resp => resp);
    }
}