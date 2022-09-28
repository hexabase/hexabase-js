import User from '.';
import Auth from '../auth';
import AuthMw from '../middlware/auth';
require('dotenv').config();
/**
 * Test with class User
 * @cmdruntest yarn jest src/lib/packages/user/user.test.ts
 */

const url = process.env.URL || '';
let tokenUs = process.env.TOKEN || '';
const confirmationId = process.env.CONFIRMATIONID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });
    if (token) {
      return tokenUs = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});
// testing get user register info by confirmId
describe('User', () => {
  describe('#register()', () => {
    it('should get user register info by confirm id without error', async () => {
      jest.useFakeTimers('legacy');
      const user = new User(url, tokenUs);

      /** check user register */
      const { userRegister, error } = await user.register(confirmationId);

      // expect response respUserRegister
      if (userRegister) {
        expect(typeof userRegister.user.id).toBe('string');
        expect(typeof userRegister.user.email).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getPasswordExpire()', () => {
    it('should get user password expiry without error', async () => {
      jest.useFakeTimers('legacy');
      const user = new User(url, tokenUs);

      /** check user password expiry */
      const { userPassEx, error } = await user.getPasswordExpire();

      // expect response getPasswordExpire
      if (userPassEx) {

        expect(typeof userPassEx.is_expired).toBe('boolean');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#userConfirm()', () => {
    it('should get user password expiry without error', async () => {
      jest.useFakeTimers('legacy');
      const user = new User(url, tokenUs);

      /** check user password expiry */
      const { userConfirm, error } = await user.userConfirm(confirmationId);

      // expect response userConfirmAsync
      if (userConfirm) {

        expect(typeof userConfirm.user.email).toBe('string');
        expect(typeof userConfirm.user.id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  // get userinfo by token without error
  describe('#get()', () => {
    it('should get userinfo by token without error', async () => {
      jest.useFakeTimers('legacy');
      const user = new User(url, tokenUs);
      const { userInfo, error } = await user.get(tokenUs);

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

});
