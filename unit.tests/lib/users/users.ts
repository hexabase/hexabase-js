import { assert } from 'chai';
import Auth from '../../../lib/auth/auth';
import {Users} from '../../../lib/users/users';
import {HxbSessionStorage} from '../../../lib/storage/sessionStorage';

before(async () =>
{
    var auth = new Auth();
    var respToken = await auth.loginAsync({ email: 'j.soliva@b-eee.com', password: 'jinpol0405' });
    HxbSessionStorage.Write('token', respToken.token);
})

describe('Users', () =>
{
    describe('#userInfoAsync()', () =>
    {
        it('should get basic user info or not null', async () =>
        {
            var users = new Users();
            var userInfo = await users.userInfoAsync();
            assert.isNotNull(userInfo)
        })
    })
})