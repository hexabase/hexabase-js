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

  // logout without error
  describe('#logout()', () => {
    it('should get logout user', async () => {
      jest.useFakeTimers('legacy');
      const auth = new Auth(url);

      const {data, error} = await auth.logout(tokenAu);

      // expect response
      if (data) {
        expect(typeof data.success).toBe('boolean');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});
