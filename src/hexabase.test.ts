import { HexabaseClient, createClient } from './index';
import Auth from './lib/packages/auth';
import Workspace from './lib/packages/workspace';
require('dotenv').config();
jest.useRealTimers();
/**
 * Test with class Hexabase
 * @cmdruntest yarn jest src/hexabase.test.ts
 */

const email = process.env.STAG_EMAIL || '';
const password = process.env.STAG_PASSWORD || '';
const token = process.env.PROD_TOKEN || '';

const client = new HexabaseClient('dev');

// testing createClient
describe('Hexabase', () => {
  describe('#createClient()', () => {
    it('get createClient and testing with url, email, password', async () => {
      jest.useFakeTimers();
      await client.login({ email, password, token});
      expect(client.currentWorkspace instanceof Workspace).toBe(true);
    });
  });


  describe('#createClient()', () => {
    it('get createClient and testing with url and token', async () => {
      jest.useFakeTimers();
      await client.login({ token});
      expect(client.currentWorkspace instanceof Workspace).toBe(true);
    });
  });

  describe('#createClient()', () => {
    it('get createClient and testing with email, password', async () => {
      jest.useFakeTimers();
      await client.login({ email, password });
      expect(client.currentWorkspace instanceof Workspace).toBe(true);
    });
  });
});
