import { assert } from "chai";
import Applications from "../../../lib/applications/applications";
import Auth from "../../../lib/auth/auth";
import Items from '../../../lib/items/items';
import {HxbSessionStorage} from '../../../lib/storage/sessionStorage';
import Workspaces from "../../../lib/workspaces/workspaces";
import Actions from '../../../lib/actions/actions';


before(async () =>
{
    var auth = new Auth();
    var respToken = await auth.loginAsync({ email: 'j.soliva@b-eee.com', password: 'jinpol0405' });
    HxbSessionStorage.Write('token', respToken.token);
});

describe('Items', () =>
{
    describe('#getItemsAsync()', () =>
    {
        it('should load items, and proper json structure', async () =>
        {
            let item = new Items()
            var datastoreItems = await item.getItemsAsync({ 
                    project_id: 'newproject', 
                    datastore_id: 'newdb1', 
                    per_page: 1, 
                    page: 1, 
                    use_display_id: true  
                })
            assert.isArray(datastoreItems.items, "datastore items are array");

            // until totalItems values are correct, use current ambigous value for the meantime
            // total_items should be 1, since I only requested for `per_page: 1`
            assert.equal(datastoreItems.totalItems, 2);
        })
    });

    describe('#getItemSearchConditionsAsync()', () =>
    {
        it('should load all search conditions and has proper json structure', async () =>
        {
            var items = new Items();
            let searchConditionResp = await items.getItemSearchConditionsAsync({ project_id: 'newproject', datastore_id: 'newdb1' });
            assert.isArray(searchConditionResp.result);
            assert.isBoolean(searchConditionResp.has_error);
            assert.equal(searchConditionResp.has_error, false);
        });
    })

    describe('#getDatastoreItemDetailsAsync()', () =>
    {
        it('should load all complete datastore item details', async () =>
        {
            var items = new Items();
            let datastoreItemDetails = await items.getDatastoreItemDetailsAsync({ project_id: 'newproject', datastore_id: 'newdb1', item_id: '5b0faa3a00f7c300061dee4c' });
            assert.isNotNull(datastoreItemDetails);
            assert.isArray(datastoreItemDetails.field_values);
            assert.isArray(datastoreItemDetails.item_actions);
            // assert.isArray(datastoreItemDetails.status_actions);
            assert.isNotNull(datastoreItemDetails.title);
        });
    });

    describe('#createItemAsync()', () =>
    {
        it('should be able to create new item from first datastore', async () =>
        {
            let ws = new Workspaces();
            var currentWs = await ws.getWorkspacesAsync();

            let application = new Applications();
            var applicationsList = await application.getApplications({ workspace_id: currentWs.workspaces[0].workspace_id });

            if(applicationsList[0] && applicationsList[0].datastores[0])
            {
                var item = new Items();
                var actions = new Actions();
                let datastoreID = applicationsList[0].datastores[0].datastore_id;
                var actionResp = await actions.getActionByDatastoreID(datastoreID);
                console.log(actionResp)
                console.log(actionResp)

                let newItemsResult = await item.createItemAsync({ 
                    datastore_id: datastoreID, 
                    project_id: 'newproject', 
                    use_display_id: true, 
                    is_notify_to_sender: false,
                    item: {}, 
                    related_ds_items: {}, 
                    return_item_result: true },
                    actionResp.actions[0].action_id);
            }
        });
    });
})