import Auth from '.';
import User from '../user';
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

  // Auth state change without error
  describe('#onAuthStateChange()', () => {
    it('should onAuthStateChange', async () => {
      jest.useFakeTimers('legacy');
      let sessions;
      let userSession;

      const auth = new Auth(url);
      const user = new User(url, tokenAu);
      const userInfo = await user?.get(tokenAu);
      const {data: authListener, error} = auth.onAuthStateChange((event, session) => {
        sessions = session ?? undefined;
        userSession = session?.user ?? undefined;
      });

      // expect response
      if (authListener) {
        expect(typeof authListener?.id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});
