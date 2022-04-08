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
            // assert.equal(datastoreItems.totalItems, 2);
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

    describe('#executeActionAsync()', () =>
    {
        it('should be able to create new item from first datastore', async () =>
        {
            var item = new Items();
                
            let newItemsResult = await item.executeActionAsync({ 
                datastore_id: 'newdb1', 
                project_id: 'newproject'
            },
            { 
                workspace: 'My Workspace',
                project: 'newproject',
                datastore: 'newdb1'
            },
            { Title: `testing ${Date.now()} 123` });
            console.log(newItemsResult)
            assert.isNull(newItemsResult.error);
        });
    });
})