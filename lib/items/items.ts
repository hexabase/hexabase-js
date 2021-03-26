import Actions from "../actions/actions";
import Applications from "../applications/applications";
import HttpAPI from "../httpApi";
import { ActionsNewResp } from "../models/actions";
import { ApplicationsRootObj, Datastore } from "../models/applications";
import { ItemHistories } from "../models/histories";
import { ItemDetailsReq, ItemDetailsResp, ItemsReq, ItemsResp, ItemsSearchConditionsReq, ItemsSearchConditionsResp, NewItemActionReq, NewItemActionResp } from "../models/items";
import { Lists } from "../utils/lists";
import Workspaces from "../workspaces/workspaces";

export enum ItemSFActions {
    New = 'new-action',
    Update = ''
}

export default class Items extends Lists
{
    private _newItemActionReq: NewItemActionReq = {} as NewItemActionReq;
    constructor(newItemActionReq?: NewItemActionReq) {
        super();
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
     * Gets item histories
     * @param datastoreID 
     * @param itemID 
     * @returns Promise<ItemHistories> 
     */
    public async getItemHistories(datastoreID: string, itemID: string): Promise<ItemHistories> {
        //datastores/:datastore-id/items/:item-id/histories
        return HttpAPI.Get<ItemHistories>(
            `datastores/${datastoreID}/items/${itemID}/histories`
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
    public async executeActionAsync(request: { 
            datastore_id: string, 
            project_id: string, 
            use_display_id?: boolean, 
            is_notify_to_sender?: boolean,
            item?: {}, 
            related_ds_items?: {}, 
            return_item_result?: boolean 
        }, 
        settings: {
            workspace?: string,
            project?: string,
            datastore?: string,    
        }, 
        payload: any): Promise<any> 
    {
        // set default values
        let { 
                use_display_id = true,
                is_notify_to_sender = false,
                return_item_result = true,
                related_ds_items = {}
            } = request;

        let ws = new Workspaces();
        var currentWs = await ws.getWorkspacesAsync().setWorkspace(settings.workspace!);
        let application = new Applications();
        var applicationsList = await application
            .getApplications({ workspace_id: currentWs!.workspace_id })
            .ResultAsync<Array<ApplicationsRootObj>>();

        var targetDatastore = {} as Datastore | undefined;
        let targetApplication = applicationsList.find(a => a.display_id === request.project_id);
        if(targetApplication)
        {
            targetDatastore = targetApplication.datastores.find(d => d.display_id === request.datastore_id);
        }
        
        // TODO move to action func instead
        var actions = new Actions();
        var actionResp = await actions.getNewActionByDatastoreID(targetDatastore!.datastore_id);
        let actionID = actionResp.actions[0].action_id;
        var actionAndFields = await actions.getNewActionsAndFields({ datastore_id: targetDatastore!.datastore_id, action_id: actionID })
        request.item =  actions.mapFieldsToIDs(actionAndFields, payload)
        
        // var itemID = await this.getItemID(targetDatastore!.datastore_id);

        // create_new_item
        // applications/:project-id/datastores/:datastore-id/items/new
        return await HttpAPI.Post<NewItemActionResp>(
            `applications/${request.project_id}/datastores/${request.datastore_id}/items/new`, 
            request,
            true).then(resp => resp);
    }
}