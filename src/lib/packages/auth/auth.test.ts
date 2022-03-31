import Auth from '.';

/**
 * Test with class Auth
 * @cmdruntest yarn jest src/lib/packages/auth/auth.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';

// get userinfo by token without error
describe('Auth', () => {
  describe('#hexabaseUserInfoAsync()', () => {
    it('should get userinfo by token without error', async () => {
      jest.useFakeTimers('legacy');
      const auth = new Auth(
        url,
        token
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
