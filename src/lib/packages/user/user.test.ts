import User from '.';
require('dotenv').config()
/**
 * Test with class User
 * @cmdruntest yarn jest src/lib/packages/user/user.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';

const confirmationId = process.env.CONFIRMATIONID || '';

// testing get user register info by confirmId
describe('User', () => {
  // describe('#userRegisterAsync()', () => {
  //   it('should get user register info by confirm id without error', async () => {
  //     jest.useFakeTimers('legacy');
  //     const user = new User(
  //       url,
  //       token
  //     );

  //     /** check user register */
  //     const respUserRegister = await user.userRegisterAsync(confirmationId);
  //     console.log('respUserRegister', respUserRegister)
  //     // expect response respUserRegister
  //     expect(typeof respUserRegister.userRegister.user.id).toBe('string');
  //     expect(typeof respUserRegister.userRegister.user.email).toBe('string');
  //   });
  // });

  // describe('#respUserPasswordEx()', () => {
  //   it('should get user password expiry without error', async () => {
  //     jest.useFakeTimers('legacy');
  //     const user = new User(
  //       url,
  //       token
  //     );

  //     /** check user password expiry */
  //     const respUserPasswordEx = await user.userPasswordExAsync();

  //     // expect response respUserPasswordEx
  //     expect(typeof respUserPasswordEx.userPasswordExpiry.is_expired).toBe('boolean');
  //   });
  // });

  // describe('#userConfirmAsync()', () => {
  //   it('should get user password expiry without error', async () => {
  //     jest.useFakeTimers('legacy');
  //     const user = new User(
  //       url,
  //       token
  //     );

  //     /** check user password expiry */
  //     const respUserConfirmAsync = await user.userConfirmAsync(confirmationId);
  //     console.log('respUserConfirmAsync', respUserConfirmAsync)

  //     // expect response userConfirmAsync
  //     expect(typeof respUserConfirmAsync.userConfirmations.user.email).toBe('string');
  //     expect(typeof respUserConfirmAsync.userConfirmations.user.id).toBe('string');
  //   });
  // });
});
