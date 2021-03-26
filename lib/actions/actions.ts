import HttpAPI from "../httpApi";
import { ActionAndFieldsReq, ActionsNewResp } from "../models/actions";
import { Lists } from "../utils/lists";

export default class Actions extends Lists {
    
    /**
     * get new action fields and other settings
     * @param  {ActionAndFieldsReq} request
     * @returns Promise
     */
    public async getNewActionsAndFields(request: ActionAndFieldsReq): Promise<any> 
    {
        return HttpAPI.Get<any>(`datastores/${request.datastore_id}/actions/${request.action_id}/fields`).then(resp => resp);
    }

    /**
     * get new-action by datastoreID
     * @param  {string} datastoreID
     * @returns Promise
     */
    public async getNewActionByDatastoreID(datastoreID: string): Promise<ActionsNewResp>
    {
        return HttpAPI.Get<ActionsNewResp>(`datastores/${datastoreID}/new-action`, null);
    }

    /**
     * map user input fields to actions fields, then output payload according to hexabase requirements
     * @param  {any} actionAndFields
     * @param  {any} userPayload
     * @returns object
     */
    public mapFieldsToIDs(actionAndFields: any, userPayload: any): object
    {
        var keyData: Array<any> = [];
        var payloadInIdKV: {[key: string]: any} = {}
        Object.keys(actionAndFields.action_fields).forEach(field =>
        {
            let fieldInfo = actionAndFields.action_fields[field];
            keyData.push({name: fieldInfo.name, id: field});
        });

        Object.keys(userPayload).forEach(key =>
        {
            let targetKey = keyData.find(k => k.name == key);
            if(targetKey)
            {
                payloadInIdKV[targetKey.id] = userPayload[key]
            }
        });

        return payloadInIdKV;
    }
}