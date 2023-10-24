require('dotenv').config();

import { HexabaseClient } from './index';

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const token = process.env.TOKEN;
const client = new HexabaseClient({env: 'dev'});

describe('HexabaseClient', () => {
  describe('login function', () => {
    it('should login by email and password', async () => {
      const result = await client.login({ email, password });
      expect(result).toBe(true);
    });
  });

  describe('login function', () => {
    it('should login by token', async () => {
      const result = await client.login({ token });
      expect(result).toBe(true);
    });
  });

  describe('logout function', () => {
    it('should logout after login', async () => {
      await client.login({ email, password });
      const result = await client.logout();
      expect(result).toBe(true);
    });
  });
});
