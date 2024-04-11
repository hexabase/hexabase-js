require('dotenv').config();

import exp from 'constants';
import Auth from '.';
import { HexabaseClient } from '../../../';
import { LocalStorage } from 'node-localstorage';

const localStorage = new LocalStorage('./scratch');

const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const client = new HexabaseClient();

describe('Auth', () => {
  describe('login function', () => {
    it('should login by email and password', async () => {
      const result = await client.login({ email, password });
      expect(typeof result).toBe('boolean');
    });
  });

  describe('logout function', () => {
    it('should logout', async () => {
      const res = await client.login({ email, password });
      expect(typeof res).toBe('boolean');
      const res2 = await client.logout();
      expect(res2).toBe(true);
      expect(client.currentUser).toBe(undefined);
    });
  });

  describe('Persistence authentication status', () => {
    it('should persistence', async () => {
      client.setPersistence(localStorage);
      const resultLogin = await client.login({ email, password });
      expect(typeof resultLogin).toBe('boolean');
      expect(localStorage.length).toBe(1);
      expect(localStorage.getItem(client.auth.tokenName)).not.toBe(null);
      await client.logout();
      expect(localStorage.length).toBe(0);
      expect(client.currentUser).toBe(undefined);
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
