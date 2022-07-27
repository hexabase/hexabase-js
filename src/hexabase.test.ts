import { createClient } from './index';
import Auth from './lib/packages/auth';
import AuthMw from './lib/packages/middlware/auth';
require('dotenv').config();
jest.useRealTimers();
/**
 * Test with class Hexabase
 * @cmdruntest yarn jest src/hexabase.test.ts
 */

const url = process.env.URL || '';
let tokenClient = process.env.TOKEN || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const workspaceId = process.env.WORKSPACEID || '';


beforeAll( async () => {
  if (email && password) {
    console.log('email, password', email, password);
    const auth = new Auth(url);
    const {token, error} = await auth.login({email, password});
    if (token) {
      return tokenClient = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

// testing createClient
describe('Hexabase', () => {
  describe('#createClient()', () => {
    it('application: get createClient and testing', async () => {
      jest.useFakeTimers('legacy');
      // const hexabase = await createClient({ url, email, password });
      const hexabase = await createClient({ url, token: tokenClient });

      console.log('Test: class application');
      const {appAndDs, error} = await hexabase.applications.getProjectsAndDatastores(workspaceId);
      if (appAndDs) {

        // console.log('appAndDs', appAndDs);
        expect(typeof appAndDs[0].name).toBe('string');
        expect(typeof appAndDs[0].application_id).toBe('string');
        expect(typeof appAndDs[0].display_id).toBe('string');
      }
    });
  });
});
