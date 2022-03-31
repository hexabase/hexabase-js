import { createClient } from './index';
require('dotenv').config()
jest.useRealTimers();
/**
 * Test with class Hexabase
 * @cmdruntest yarn jest src/hexabase.test.ts
 */

const url = process.env.URL || ''
const token = process.env.TOKEN || ''
const workspaceId = process.env.WORKSPACEID || ''

// testing createClient
describe('Hexabase', () => {
  describe('#createClient()', () => {
    it('should get createClient and testing', async () => {
      jest.useFakeTimers('legacy');
      const hexabase = createClient({ url, token });

      console.log('Test: class auth');
      const userInfo = await hexabase.auth.hexabaseUserInfoAsync();
      console.log('userInfo', userInfo);
      expect(typeof userInfo.userInfo.email).toBe('string');
      expect(typeof userInfo.userInfo.current_workspace_id).toBe('string');
      expect(typeof userInfo.userInfo.profile_pic).toBe('string');
      expect(typeof userInfo.userInfo.is_ws_admin).toBe('string');
      expect(typeof userInfo.userInfo.u_id).toBe('string');


      console.log('Test: class application');
      const applications = await hexabase.application.hexabaseGetApplicationAndDataStoreAsync(workspaceId);
      console.log('applications', applications);
      expect(typeof applications.getApplicationAndDataStore[0].application_id).toBe('string');
      expect(typeof applications.getApplicationAndDataStore[0].name).toBe('string');
      expect(typeof applications.getApplicationAndDataStore[0].display_id).toBe('string');
    });
  });
});
