import { assert } from "chai";
import Auth from "../../../lib/auth/auth";
import Workspaces from '../../../lib/workspaces/workspaces';
import {WorkspaceResp} from '../../../lib/models/workspaces';
import {HxbSessionStorage} from '../../../lib/storage/sessionStorage';


before(async () =>
{
    var auth = new Auth();
    var respToken = await auth.loginAsync({ email: 'j.soliva@b-eee.com', password: 'jinpol0405' });
    HxbSessionStorage.Write('token', respToken.token);
});

describe('Workspace', () =>
{
    describe('#getWorkspacesAsync()', () =>
    {
        it('should get list of workspaces', async () =>
        {
            var workspaces = new Workspaces();
            var workspaceLists = await workspaces.getWorkspacesAsync().Result();
            assert.isArray(workspaceLists.workspaces, "contains workspaces");
        });

        it('should have current_workspace_id as type string', async () =>
        {
            var workspaces = new Workspaces();
            var workspaceLists = await workspaces.getWorkspacesAsync().Result();

            // disable assertion until linkerapi1 is fixed 
            // issue: https://github.com/b-eee/Hexabase/issues/130            
            // assert.isString(workspaceLists.current_workspace_id, "current workspace_id is string");

            assert.isNotNull(workspaceLists);
            assert.isArray(workspaceLists.workspaces);
        })
    });

    describe('#setCurrentWorkspace()', () =>
    {
        it('should set current workspace by id', async () =>
        {
            var workspaces = new Workspaces();
            var workspaceLists = await workspaces.getWorkspacesAsync().Result();
            assert.isNotEmpty(workspaceLists.workspaces, 'workspace list is not empty');

            var setWorkspaceResp = await workspaces.setCurrentWorkspace({ workspace_id: workspaceLists.workspaces[0].workspace_id });
            assert.isNull(setWorkspaceResp, "success since received null response")
            // TODO add more assertions
        })
    })
});