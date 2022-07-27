import Auth from '.';
import AuthMw from '../middlware/auth';
require('dotenv').config();
/**
 * Test with class Auth
 * @cmdruntest yarn jest src/lib/packages/auth/auth.test.ts
 */

const url = process.env.URL || '';
let tokenAu = process.env.TOKEN || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const tokenU = process.env.TOKEN || '';
describe('Auth', () => {
  describe('#login()', () => {
    it('should get field setting in Ds', async () => {
      jest.useFakeTimers('legacy');
      console.log('[email, password]: ', email, password);
      const auth = new Auth(url);
      const {token, error} = await auth.login({email, password});
      if (token) {
        return tokenAu = token;
      } else {
        throw Error(`Need login faild to initialize sdk: ${error}`);
      }
    });
  });

  // get userinfo by token without error
  describe('#get()', () => {
    it('should get userinfo by token without error', async () => {
      jest.useFakeTimers('legacy');
      const auth = new Auth(url);

      const {userInfo, error} = await auth.get(tokenU);

      // expect response
      if (userInfo) {

        expect(typeof userInfo.username).toBe('string');
        expect(typeof userInfo.email).toBe('string');
        expect(typeof userInfo.profile_pic).toBe('string');
        expect(typeof userInfo.u_id).toBe('string');
        expect(typeof userInfo.current_workspace_id).toBe('string');
        expect(typeof userInfo.is_ws_admin).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  // logout without error
  describe('#logout()', () => {
    it('should get logout user', async () => {
      jest.useFakeTimers('legacy');
      const auth = new Auth(url);

      const {data, error} = await auth.logout(tokenU);

      // expect response
      if (data) {
        expect(typeof data.success).toBe('boolean');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});
