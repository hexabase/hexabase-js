import { assert } from "chai";
import Auth from "../../../lib/auth/auth";
import Workspaces from '../../../lib/workspaces/workspaces';
import {WorkspaceResp} from '../../../lib/models/workspaces';
import {HxbSessionStorage} from '../../../lib/storage/sessionStorage';
import {Awaited, ValueOf, assert as assrt} from 'ts-essentials';


before(async () =>
{
    var auth = new Auth();
    var respToken = await auth.loginAsync({ email: 'j.soliva@b-eee.com', password: 'jinpol0405' });
    HxbSessionStorage.Write('token', respToken.token);
});

const PromiseOK = <T>(val: T): Promise<T> => {
    return Promise.resolve(val);
};

describe('Workspace', () =>
{
    describe('#getWorkspacesAsync()', () =>
    {
        console.log('starting test...')
        it('should get list of workspaces', async () =>
        {
            var workspaces = new Workspaces();
            var workspaceLists = await workspaces.getWorkspacesAsync();
            assert.isArray(workspaceLists.workspaces, "contains workspaces");
        });

        it('should have current_workspace_id as type string', async () =>
        {
            var workspaces = new Workspaces();
            var workspaceLists = await workspaces.getWorkspacesAsync();
            assert.isString(workspaceLists.current_workspace_id, "current workspace_id is string");
            assert.isNotNull(workspaceLists);
        })
    });
});