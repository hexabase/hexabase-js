import { createClient } from './index';

const url = 'https://hxb-graph.hexabase.com/graphql';
const tokenHxb = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDg4ODc1NDYsImlhdCI6MTY0ODU0MTk0Niwic3ViIjoiNjIwZjU3NWJkYjAwMGNiYTk4YjY1ZDczIiwidW4iOiJVc2VyTmFtZVRlc3QifQ.ZXS5bRxFqApUulffUFpsg3Cq6YX8IpNYsh4so85zXTu9q2OOHqR0561gebDn5qT5jqomhAS4IXeAjnfx0pDWqJBp00XAQPORBHJLwuH_5VposwKsQNwQJPLN9EXHgLC_xAHKQAZHCoJ-Qi63XRmSLUX8ouXjPXzvD9ST_gM0YA-l9ObsBZDUJLO5bX79jRnKvDXZCJQ7InbvNYvCISnpI5bpY5KJTLAlULk8sxD2NBrcRvJ-lCDPVKKWMWRi0X7LkyuKzK5WyrjEiebFM5VWXuW99g2pppjKV6WQFgX3ikjVMpqGmtGkKB2L4tCEImlc-h4mShprnnuJsStdTBLEDA';
// testing createClient
describe('Hexabase', () => {
  describe('#createClient()', () => {
    it('should get createClient and testing', async () => {
      jest.useFakeTimers('legacy');
      const hexabase = createClient(
        url,
        tokenHxb
      );

      console.log('Test: class auth');
      const userInfo =  await hexabase.auth.hexabaseUserInfoAsync();
      console.log('userInfo', userInfo);
      expect(typeof userInfo.userInfo.email).toBe('string');
      expect(typeof userInfo.userInfo.current_workspace_id).toBe('string');
      expect(typeof userInfo.userInfo.profile_pic).toBe('string');
      expect(typeof userInfo.userInfo.is_ws_admin).toBe('string');
      expect(typeof userInfo.userInfo.u_id).toBe('string');


      console.log('Test: class application');
      const applications = await hexabase.application.hexabaseGetApplicationAndDataStoreAsync('620f5774bb0b83cfd6b83d8f');
      console.log('applications', applications);
      expect(typeof applications.getApplicationAndDataStore[0].application_id).toBe('string');
      expect(typeof applications.getApplicationAndDataStore[0].name).toBe('string');
      expect(typeof applications.getApplicationAndDataStore[0].display_id).toBe('string');
    });
  });
});

// yarn jest src/hexabase.test.ts