import User from '.';
require('dotenv').config();
/**
 * Test with class User
 * @cmdruntest yarn jest src/lib/packages/user/user.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';

const confirmationId = process.env.CONFIRMATIONID || '';

// testing get user register info by confirmId
describe('User', () => {
  describe('#userRegisterAsync()', () => {
    it('should get user register info by confirm id without error', async () => {
      jest.useFakeTimers('legacy');
      const user = new User(
        url,
        token
      );

      /** check user register */
      const {userRegister, error} = await user.userRegisterAsync(confirmationId);

      // expect response respUserRegister
      if(userRegister) {
        console.log('userRegister: ', userRegister);
        
        expect(typeof userRegister.user.id).toBe('string');
        expect(typeof userRegister.user.email).toBe('string');
      }else{
        console.log('error: ', error)
      
        expect(typeof error).toBe('string');
      }
    });
  });

  describe('#respUserPasswordEx()', () => {
    it('should get user password expiry without error', async () => {
      jest.useFakeTimers('legacy');
      const user = new User(
        url,
        token
      );

      /** check user password expiry */
      const {userPassEx, error} = await user.userPasswordExAsync();

      // expect response respUserPasswordEx
      if(userPassEx) {
        console.log('userPassEx: ', userPassEx);
        
        expect(typeof userPassEx.is_expired).toBe('boolean');
      }else{
        console.log('error: ', error)
      
        expect(typeof error).toBe('string');
      }
    });
  });

  describe('#userConfirmAsync()', () => {
    it('should get user password expiry without error', async () => {
      jest.useFakeTimers('legacy');
      const user = new User(
        url,
        token
      );

      /** check user password expiry */
      const {userConfirm, error} = await user.userConfirmAsync(confirmationId);

      // expect response userConfirmAsync
      if(userConfirm) {
        console.log('userConfirm: ', userConfirm);
        
        expect(typeof userConfirm.user.email).toBe('string');
        expect(typeof userConfirm.user.id).toBe('string');
      }else{
        console.log('error: ', error)
      
        expect(typeof error).toBe('string');
      }
    });
  });
});
