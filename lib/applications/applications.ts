import { resolve } from "dns";
import HttpAPI from "../httpApi";
import { ApplicationsRootObj, Datastore, GetApplicationsReq } from "../models/applications";
import { Lists } from "../utils/lists";

export default class Applications extends Lists 
{
    /**
     * get workspace applications list
     * @param  {GetApplicationsReq} getApplications
     * @returns Promise
     */
    public getApplications(getApplications: GetApplicationsReq): Applications {
        this.targetResultPromise = HttpAPI.Get<Array<ApplicationsRootObj>>(`workspaces/${getApplications.workspace_id}/applications`, getApplications);
        // Promise.resolve(HttpAPI.Get<Array<ApplicationsRootObj>>(`workspaces/${getApplications.workspace_id}/applications`, getApplications)).then(res => 
        // {
        //     this.targetNonAsync = res;
        //     console.log(this.targetNonAsync)
        //     console.log('tartgetnon async assigned!');
        //     return this;
        // });
        return this;
    }

    public selecteProjectAndDt(settings: { p_id: string, d_id: string, use_display_id: boolean }): Applications 
    {
        Promise.resolve(this.targetNonAsync).then(res =>
            {
                console.log(res)
                console.log('================x');
            })
        
        // Promise.resolve<Array<ApplicationsRootObj>>(this.targetResultPromise).then(async applications =>
        // {
        //     let targetApplication = applications.find(app => app.display_id == settings.p_id);
        //     var targetDt = targetApplication?.datastores.find(d => d.name == settings.d_id);

        //     targetDt!.application_id = targetApplication!.application_id;
        //     this.targetResultPromise = new Promise<Datastore>(() => targetDt);
        //     console.log(await this.targetResultPromise)
        //     console.log('done updating..')
        // });

        return this
    }
}