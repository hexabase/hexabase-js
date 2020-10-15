import HttpAPI from "../httpApi";
import { ApplicationsRootObj, GetApplicationsReq } from "../models/applications";

export default class Applications {
    
    /**
     * get workspace applications list
     * @param  {GetApplicationsReq} getApplications
     * @returns Promise
     */
    public async getApplications(getApplications: GetApplicationsReq): Promise<Array<ApplicationsRootObj>> {
        return HttpAPI.Get<Array<ApplicationsRootObj>>(`workspaces/${getApplications.workspace_id}/applications`, getApplications).then(resp => resp);
    }
}