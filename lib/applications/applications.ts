import { resolve } from "dns";
import HttpAPI from "../httpApi";
import { ApplicationsRootObj, Datastore, GetApplicationsReq } from "../models/applications";
import { Lists } from "../utils/lists";

export default class Applications extends Lists 
{
    public innerTargetResultPromise: Promise<any | undefined> = new Promise<any | undefined>(() => {});
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
        let newRes = this.targetResultPromise;
        // this.targetResultPromise = new Promise<Array<ApplicationsRootObj> | undefined>(async (res) => {
        //     let targetRes = await this.ResultAsync<Array<ApplicationsRootObj>>()
        //     let targetApp = targetRes.find((s: any) => s.display_id === settings.p_id);
        //     if(targetApp)
        //     {
        //         let datastore = targetApp.datastores.find((dt: any) => dt.display_id === settings.d_id);
        //         // console.log(datastore)
        //         if(datastore) res(datastore);
        //         // console.log('done selecteProjectAndDt')
        //     }
        // });
        Promise.resolve(newRes).then(res =>
        {
        //     let targetApp = res.find((s: any) => s.display_id === settings.p_id);
        //     if(targetApp)
        //     {
        //         let datastore = targetApp.datastores.find((dt: any) => dt.display_id === settings.d_id);
        //         console.log(datastore)
        //         if(datastore) this.targetResultPromise = datastore;
        //         console.log('done selecteProjectAndDt')
        //     }
            this.targetResultPromise = new Promise<Array<ApplicationsRootObj> | undefined>(async () => {
                let targetApp = await res.find((s: any) => s.display_id === settings.p_id);
                if(targetApp)
                {
                    let datastore = targetApp.datastores.find((dt: any) => dt.display_id === settings.d_id);
                    console.log(datastore)
                    if(datastore) return datastore;
                    // console.log('done selecteProjectAndDt')
                }
            });
            console.log('targetResultPromise updated!');

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