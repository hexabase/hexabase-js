require('dotenv').config();

import Auth from '.';
import { HexabaseClient } from '../../../';

const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const client = new HexabaseClient();

describe('Auth', () => {
  describe('login function', () => {
    it('should login by email and password', async () => {
      const auth = new Auth(client.urlHxb);
      const result = await auth.login({ email, password });
      expect(typeof result).toBe('string');
    });
  });

  describe('logout function', () => {
    it('should logout', async () => {
      const auth = new Auth(client.urlHxb);
      const resultLogin = await auth.login({ email, password });
      expect(typeof resultLogin).toBe('string');
      auth.client.setHeaders({ authorization: `Bearer ${resultLogin}` });
      const resultLogout = await auth.logout();
      expect(resultLogout).toBe(true);
    });
  });

  describe('onAuthStateChange function', () => {
    it('should onAuthStateChange', async () => {
      const auth = new Auth(client.urlHxb);
      await auth.login({ email, password });
      const id = auth.onAuthStateChange((event, session) => {
      });
      expect(typeof id).toBe('object');
    });
  });
});
