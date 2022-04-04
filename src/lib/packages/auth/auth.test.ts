import Auth from '.';
require('dotenv').config();
/**
 * Test with class Auth
 * @cmdruntest yarn jest src/lib/packages/auth/auth.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';

// get userinfo by token without error
describe('Auth', () => {
  describe('#userInfoAsync()', () => {
    it('should get userinfo by token without error', async () => {
      jest.useFakeTimers('legacy');
      const auth = new Auth(
        url,
        token
      );

      const {userInfo, error} = await auth.userInfoAsync();

      // expect response
      if(userInfo) {
        console.log('user: ', userInfo);

        expect(typeof userInfo.username).toBe('string');
        expect(typeof userInfo.email).toBe('string');
        expect(typeof userInfo.profile_pic).toBe('string');
        expect(typeof userInfo.u_id).toBe('string');
        expect(typeof userInfo.current_workspace_id).toBe('string');
        expect(typeof userInfo.is_ws_admin).toBe('string');
      }else{
        throw new Error(`Error: ${error}`);
      }
     
    });
  });
});
