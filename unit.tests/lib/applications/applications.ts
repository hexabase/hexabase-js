import { assert } from "chai";
import Auth from "../../../lib/auth/auth";
import Applications from '../../../lib/applications/applications';
import Workspaces from '../../../lib/workspaces/workspaces';
import {HxbSessionStorage} from '../../../lib/storage/sessionStorage';


before(async () =>
{
    var auth = new Auth();
    var respToken = await auth.loginAsync({ email: 'j.soliva@b-eee.com', password: 'jinpol0405' });
    HxbSessionStorage.Write('token', respToken.token);
});

describe('Applications', () =>
{
    describe('#getApplications()', () =>
    {
        it('it should get a list of applications, with datastores', async () =>
        {
            var workspaces = new Workspaces();
            var workspaceLists = await workspaces.getWorkspacesAsync();
            assert.isNotEmpty(workspaceLists.workspaces, 'workspace list is not empty');

            var applications = new Applications();
            var applicationsList = await applications.getApplications({ workspace_id: workspaceLists.workspaces[0].workspace_id });
            assert.isNotEmpty(applicationsList);
            assert.isArray(applicationsList);
        })
    })
})