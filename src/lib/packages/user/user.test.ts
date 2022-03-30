import User from '.';

/**
 * Test with class User
 * @cmdruntest yarn jest src/lib/packages/user/user.test.ts
 */
const url = 'https://hxb-graph.hexabase.com/graphql';
const tokenHxb = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDg4ODc1NDYsImlhdCI6MTY0ODU0MTk0Niwic3ViIjoiNjIwZjU3NWJkYjAwMGNiYTk4YjY1ZDczIiwidW4iOiJVc2VyTmFtZVRlc3QifQ.ZXS5bRxFqApUulffUFpsg3Cq6YX8IpNYsh4so85zXTu9q2OOHqR0561gebDn5qT5jqomhAS4IXeAjnfx0pDWqJBp00XAQPORBHJLwuH_5VposwKsQNwQJPLN9EXHgLC_xAHKQAZHCoJ-Qi63XRmSLUX8ouXjPXzvD9ST_gM0YA-l9ObsBZDUJLO5bX79jRnKvDXZCJQ7InbvNYvCISnpI5bpY5KJTLAlULk8sxD2NBrcRvJ-lCDPVKKWMWRi0X7LkyuKzK5WyrjEiebFM5VWXuW99g2pppjKV6WQFgX3ikjVMpqGmtGkKB2L4tCEImlc-h4mShprnnuJsStdTBLEDA';
const confirmationId = '';

// testing get user register info by confirmId
describe('User', () => {
  describe('#hexabaseUserRegisterResAsync()', () => {
    it('should get user register info by confirm id without error', async () => {
      jest.useFakeTimers('legacy');
      const user = new User(
        url,
        tokenHxb
      );

      const respUserRegister = await user.hexabaseUserRegisterResAsync(confirmationId);

      // expect response
      expect(typeof respUserRegister.userRegister.user.id).toBe('string');
      expect(typeof respUserRegister.userRegister.user.email).toBe('string');
    });
  });
});
