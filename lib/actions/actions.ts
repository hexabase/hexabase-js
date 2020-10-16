import HttpAPI from "../httpApi";
import { ActionAndFieldsReq, ActionsNewResp } from "../models/actions";

export default class Actions {
    
    /**
     * @param  {ActionAndFieldsReq} request
     * @returns Promise
     */
    public async getActionsAndFields(request: ActionAndFieldsReq): Promise<any> 
    {
        return HttpAPI.Get<any>(`datastores/${request.datastore_id}/actions/${request.action_id}/fields`).then(resp => resp);
    }

    public async getActionByDatastoreID(datastoreID: string): Promise<ActionsNewResp>
    {
        return HttpAPI.Get<ActionsNewResp>(`datastores/${datastoreID}/new-action`, null, true);
    }
}