import { assert } from 'console';
import Auth from '.';
import User from '../user';
import { HexabaseClient } from '../../../';
require('dotenv').config();
/**
 * Test with class Auth
 * @cmdruntest yarn jest src/lib/packages/auth/auth.test.ts
 */

const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const client = new HexabaseClient('dev');

describe('Auth', () => {
  describe('#login()', () => {
    it('should get field setting in Ds', async () => {
      jest.useFakeTimers('legacy');
      const bol = await client.login({ email, password });
      expect(typeof bol).toBe('boolean');
    });
  });

  // logout without error
  describe('#logout()', () => {
    it('should get logout user', async () => {
      jest.useFakeTimers('legacy');
      const bol = await client.login({ email, password });
      expect(typeof bol).toBe('boolean');
      const bol2 = await client.logout();
      expect(typeof bol2).toBe(true);
    });
  });

  // Auth state change without error
  describe('#onAuthStateChange()', () => {
    it('should onAuthStateChange', async () => {
      jest.useFakeTimers('legacy');
      await client.login({ email, password });
      const id = client.auth.onAuthStateChange((event, session) => {
      });
      expect(typeof id).toBe('string');
    });
  });
});
