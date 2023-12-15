require('dotenv').config();
import HexabaseClient from '../../../HexabaseClient';
import FileObject from '.';
import { Blob } from 'buffer';

/**
 * Test with class Datastore
 * @cmdruntest yarn jest src/lib/packages/datastore/datastore.test.ts
 */
const token = process.env.TOKEN || '';
const client = new HexabaseClient();
const workspaceId = process.env.DEV_WORKSPACE_ID;
const datastoreId = process.env.DEV_DATASOTRE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

beforeAll(async () => {
  await client.login({ email, password, token });
});

describe('UserRole', () => {
  describe('#get()', () => {
    it('should get user role', async () => {
      console.log(client.currentUser);
    });
  });
});
