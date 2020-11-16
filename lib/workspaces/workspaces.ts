import HttpAPI from "../httpApi";
import { SetWorkspaceReq, Workspace, WorkspaceResp } from "../models/workspaces";
import { Lists } from "../utils/lists";

export default class Workspaces extends Lists
{
    private targetWsResp: Promise<WorkspaceResp> = new Promise<WorkspaceResp>(() => {});
    /**
     * get workspaces list
     * @returns Promise
     */
    // public async getWorkspacesAsync(): Promise<WorkspaceResp> {
    //     return HttpAPI.Get<WorkspaceResp>(`workspaces`, {}).then(resp => resp);
    // }
    public getWorkspacesAsync(): Workspaces {
        this.targetResultPromise = HttpAPI.Get<WorkspaceResp>(`workspaces`, {});
        return this;
    }

    public async getWorkspaceByNameAsync(): Promise<WorkspaceResp> {
        return HttpAPI.Get<WorkspaceResp>(`workspaces`, {}).then(resp => resp);
    }    

    /**
     * set the current user workspace by workspace_id
     * @param  {SetWorkspaceReq} setWorkspaceReq
     * @returns Promise
     */
    public async setCurrentWorkspace(setWorkspaceReq: SetWorkspaceReq): Promise<object> {
        return HttpAPI.Post<object>(`workspaces/${setWorkspaceReq.workspace_id}/select`, setWorkspaceReq).then(resp => resp);
    }

    public async setWorkspace(workspaceName: string): Promise<Workspace | undefined>
    {
        var resWorkspace = await this.ResultAsync<WorkspaceResp>();
        return resWorkspace.workspaces.find(w => w.workspace_name == workspaceName);
    }
}