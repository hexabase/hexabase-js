import HttpAPI from "../httpApi";
import { ActionsNewResp } from "../models/actions";
import { ItemDetailsReq, ItemDetailsResp, ItemsReq, ItemsResp, ItemsSearchConditionsReq, ItemsSearchConditionsResp, NewItemActionReq } from "../models/items";

export default class Items {
    
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

    public async getItemID(datastoreID: string): Promise<{ item_id: string }> 
    {
        return HttpAPI.Post<{ item_id: string }>(`datastores/${datastoreID}/items/create-id`, null).then(resp => resp);
    }

    public async createItemAsync(request: NewItemActionReq, actionID: string): Promise<any> {
        
        var itemID = await this.getItemID(request.datastore_id);

        var newItemResp = await HttpAPI.Post<any>(
            `items/${itemID.item_id}/new-actions/${actionID}`, 
            request,
            true).then(resp => resp);
            
        console.log(newItemResp)
        return Promise.resolve();
    }
}