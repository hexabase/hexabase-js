import Actions from "../actions/actions";
import HttpAPI from "../httpApi";
import { ActionsNewResp } from "../models/actions";
import { ItemDetailsReq, ItemDetailsResp, ItemsReq, ItemsResp, ItemsSearchConditionsReq, ItemsSearchConditionsResp, NewItemActionReq, NewItemActionResp } from "../models/items";

export default class Items 
{
    private _newItemActionReq: NewItemActionReq = {} as NewItemActionReq;
    constructor(newItemActionReq?: NewItemActionReq) {
        // set default values;
        if(newItemActionReq)
        {
            this._newItemActionReq.is_notify_to_sender = false;
        }
    }

    /**
     * get items list of datastore, can also be used for search
     * @param  {ItemsReq} request
     * @returns Promise
     */
    public async getItemsAsync(request: ItemsReq): Promise<ItemsResp> {
        return HttpAPI.Post<ItemsResp>(
            `applications/${request.project_id}/datastores/${request.datastore_id}/items/search`, 
            request
        ).then(resp => resp);
    }

    /**
     * get datastore items search conditions, is also used in queries tab/menu
     * @param  {ItemsSearchConditionsReq} request
     * @returns Promise
     */
    public async getItemSearchConditionsAsync(request: ItemsSearchConditionsReq): Promise<ItemsSearchConditionsResp> {
        return HttpAPI.Get<ItemsSearchConditionsResp>(
            `applications/${request.project_id}/datastores/${request.datastore_id}/items/conditions`
        ).then(resp => resp);
    }

    /**
     * get complete datastore item details
     * @param  {ItemDetailsReq} request
     * @returns Promise
     */
    public async getDatastoreItemDetailsAsync(request: ItemDetailsReq): Promise<ItemDetailsResp> {
        return HttpAPI.Get<ItemDetailsResp>(
            `applications/${request.project_id}/datastores/${request.datastore_id}/items/details/${request.datastore_id}`
        ).then(resp => resp);
    }

    /**
     * @param  {string} datastoreID
     * @returns string
     */
    public async getItemID(datastoreID: string): Promise<{ item_id: string }> 
    {
        return HttpAPI.Post<{ item_id: string }>(`datastores/${datastoreID}/items/create-id`, null).then(resp => resp);
    }
    
    /**
     *  create new datastore item by using new-action
     * @param  {{datastore_id:string} request
     * @param  {string} project_id
     * @param  {boolean} use_display_id?
     * @param  {boolean} is_notify_to_sender?
     * @param  {{}} item?
     * @param  {{}} related_ds_items?
     * @param  {boolean}} return_item_result?
     * @param  {any} payload
     * @returns Promise
     */
    public async createItemAsync(request: { 
            datastore_id: string, 
            project_id: string, 
            use_display_id?: boolean, 
            is_notify_to_sender?: boolean,
            item?: {}, 
            related_ds_items?: {}, 
            return_item_result?: boolean 
        }, 
        payload: any): Promise<NewItemActionResp> 
    {
        // set default values
        let { 
                use_display_id = true,
                is_notify_to_sender = false,
                return_item_result = true,
                related_ds_items = {}
            } = request;
        
        var actions = new Actions();
        var actionResp = await actions.getNewActionByDatastoreID(request.datastore_id);
        let actionID = actionResp.actions[0].action_id;
        var actionAndFields = await actions.getNewActionsAndFields({ datastore_id: request.datastore_id, action_id: actionID })
        request.item =  actions.mapFieldsToIDs(actionAndFields, payload)
        
        var itemID = await this.getItemID(request.datastore_id);

        return await HttpAPI.Post<NewItemActionResp>(
            `items/${itemID.item_id}/new-actions/${actionID}`, 
            request).then(resp => resp);
    }
}