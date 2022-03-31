import User from '.';

/**
 * Test with class User
 * @cmdruntest yarn jest src/lib/packages/user/user.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';
 
const confirmationId = process.env.CONFIRMATIONID || '';

// testing get user register info by confirmId
describe('User', () => {
  describe('#hexabaseUserRegisterResAsync()', () => {
    it('should get user register info by confirm id without error', async () => {
      jest.useFakeTimers('legacy');
      const user = new User(
        url,
        token
      );

      const respUserRegister = await user.hexabaseUserRegisterResAsync(confirmationId);

      // expect response
      expect(typeof respUserRegister.userRegister.user.id).toBe('string');
      expect(typeof respUserRegister.userRegister.user.email).toBe('string');
    });
  });
});
