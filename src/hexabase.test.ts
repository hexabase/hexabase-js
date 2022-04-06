import { createClient } from './index';
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
    const authMw = new AuthMw(url);
    const {token, error} = await authMw.loginAsync({email, password});
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
    it('auth: get createClient and testing', async () => {
      jest.useFakeTimers('legacy');
      const hexabase = await createClient({ url, email, password });
      // const hexabase = await createClient({ url, token: tokenClient });

      console.log('Test: class auth');
      const {userInfo, error} = await hexabase.auth.userInfoAsync();
      if (userInfo) {

        console.log('userInfo', userInfo);
        expect(typeof userInfo.email).toBe('string');
        expect(typeof userInfo.current_workspace_id).toBe('string');
        expect(typeof userInfo.profile_pic).toBe('string');
        expect(typeof userInfo.is_ws_admin).toBe('string');
        expect(typeof userInfo.u_id).toBe('string');
      }
    });

    it('application: get createClient and testing', async () => {
      jest.useFakeTimers('legacy');
      // const hexabase = await createClient({ url, email, password });
      const hexabase = await createClient({ url, token: tokenClient });

      console.log('Test: class application');
      const {appAndDs, error} = await hexabase.application.getAppAndDsAsync(workspaceId);
      if (appAndDs) {

        console.log('appAndDs', appAndDs);
        expect(typeof appAndDs[0].name).toBe('string');
        expect(typeof appAndDs[0].application_id).toBe('string');
        expect(typeof appAndDs[0].display_id).toBe('string');
      }
    });
  });
});
