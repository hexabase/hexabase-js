import { assert } from "chai";
import Auth from "../../../lib/auth/auth";
import Workspaces from '../../../lib/workspaces/workspaces';
import {WorkspaceResp} from '../../../lib/models/workspaces';

before(async () =>
{
    var auth = new Auth();
    await auth.loginAsync({ email: 'j.soliva@b-eee.com', password: 'jinpol0405' });
});

describe('Workspace', () =>
{
    describe('#getWorkspacesAsync()', () =>
    {
        it('should get list of workspaces', async () =>
        {
            var workspaces = new Workspaces();
            var workspaceLists = await workspaces.getWorkspacesAsync();
            assert.typeOf(workspaceLists, 'WorkspaceResp');
        });
    });
});