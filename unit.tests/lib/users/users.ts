import { assert } from 'chai';
import Auth from '../../../lib/auth/auth';
import {Users} from '../../../lib/users/users';

before(async () =>
{
    var auth = new Auth();
    await auth.loginAsync({ email: 'j.soliva@b-eee.com', password: 'jinpol0405' });    
})

describe('Users', () =>
{
    describe('#userInfoAsync()', () =>
    {
        it('should get basic user info', async () =>
        {
            var users = new Users();
            var userInfo = await users.userInfoAsync();
            console.log(userInfo.current_workspace_id)    
        })
    })
})