import Auth from '.';

/**
 * Test with class Auth
 * @cmdruntest yarn jest src/lib/packages/auth/auth.test.ts
 */
const url = 'https://hxb-graph.hexabase.com/graphql';
const tokenHxb = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDg4ODc1NDYsImlhdCI6MTY0ODU0MTk0Niwic3ViIjoiNjIwZjU3NWJkYjAwMGNiYTk4YjY1ZDczIiwidW4iOiJVc2VyTmFtZVRlc3QifQ.ZXS5bRxFqApUulffUFpsg3Cq6YX8IpNYsh4so85zXTu9q2OOHqR0561gebDn5qT5jqomhAS4IXeAjnfx0pDWqJBp00XAQPORBHJLwuH_5VposwKsQNwQJPLN9EXHgLC_xAHKQAZHCoJ-Qi63XRmSLUX8ouXjPXzvD9ST_gM0YA-l9ObsBZDUJLO5bX79jRnKvDXZCJQ7InbvNYvCISnpI5bpY5KJTLAlULk8sxD2NBrcRvJ-lCDPVKKWMWRi0X7LkyuKzK5WyrjEiebFM5VWXuW99g2pppjKV6WQFgX3ikjVMpqGmtGkKB2L4tCEImlc-h4mShprnnuJsStdTBLEDA';

// get userinfo by token without error
describe('Auth', () => {
  describe('#hexabaseUserInfoAsync()', () => {
    it('should get userinfo by token without error', async () => {
      jest.useFakeTimers('legacy');
      const auth = new Auth(
        url,
        tokenHxb
      );

      const respUserInfo = await auth.hexabaseUserInfoAsync();
      console.log('respUserInfo', respUserInfo);

      // expect response
      expect(typeof respUserInfo.userInfo.username).toBe('string');
      expect(typeof respUserInfo.userInfo.email).toBe('string');
      expect(typeof respUserInfo.userInfo.profile_pic).toBe('string');
      expect(typeof respUserInfo.userInfo.u_id).toBe('string');
      expect(typeof respUserInfo.userInfo.current_workspace_id).toBe('string');
      expect(typeof respUserInfo.userInfo.is_ws_admin).toBe('string');
    });
  });
});
