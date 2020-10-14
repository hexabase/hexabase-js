import HttpAPI from "../httpApi";
import { WorkspaceResp } from "../models/workspaces";

export default class Workspaces {
    
    /**
     * @returns Promise
     */
    public async getWorkspacesAsync(): Promise<WorkspaceResp> {
        return HttpAPI.Get<WorkspaceResp>(`workspaces`, {}).then(resp => resp);
    }
}