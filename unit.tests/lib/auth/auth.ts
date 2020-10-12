import { assert } from 'chai';
import Auth from '../../../lib/auth/auth';

before(async () =>
{
    var auth = new Auth();
    await auth.loginAsync({ email: 'j.soliva@b-eee.com', password: 'jinpol0405' });    
})

describe('Auth', () => {
    describe('#loginAsync()', () => 
    {
        it('should login without error', async () => 
        {
            var auth = new Auth();
            var loginResp = await auth.loginAsync({ email: 'j.soliva@b-eee.com', password: 'jinpol0405' });
            assert.isNotNull(loginResp.token, "token exists!")
        })
    });

    describe('#getTokenAsync()', () => 
    {
        it('should get temporary token', async () =>
        {
            try
            {
                var auth = new Auth();
                var tokenResp = await auth.getTokenAsync();
                console.log(tokenResp);
                console.log('============')
                assert.isNotNull(tokenResp.token, "got temporary token");    
            } catch(err)
            {
                console.log(err.data.message)
            }
        });
    })
})