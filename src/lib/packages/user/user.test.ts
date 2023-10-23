import { PostInviteUsersPl, UsernameExists, UsernameExistsPl } from '../../types/user';
import User from '.';
import Auth from '../auth';
import { HexabaseClient } from '../../../';
require('dotenv').config();
/**
 * Test with class User
 * @cmdruntest yarn jest src/lib/packages/user/user.test.ts
 */

// let userNameExistsResp: any;
const url = process.env.URL || '';
// let tokenUs = process.env.TOKEN || '';
const confirmationId = process.env.CONFIRMATION_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const groupId = process.env.GROUP_ID || '';

const client = new HexabaseClient({ env: 'dev' });

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const token = await auth.login({ email, password });
    return token;
  }
});
// testing get user register info by confirmId
describe('User', () => {
  describe('#register()', () => {
    it('should get user register info by confirm id without error', async () => {
      jest.useFakeTimers('legacy');
      const userRegister = await User.confirm(confirmationId);
      // expect response respUserRegister
      expect(typeof userRegister.id).toBe('string');
      expect(typeof userRegister.email).toBe('string');
    });
  });

  describe('#getPasswordExpire()', () => {
    it('should get user password expiry without error', async () => {
      /*
      jest.useFakeTimers('legacy');
      const user = new User(url, tokenUs);

      const { userPassEx, error } = await user.getPasswordExpire();

      // expect response getPasswordExpire
      if (userPassEx) {

        expect(typeof userPassEx.is_expired).toBe('boolean');
      } else {
        throw new Error(`Error: ${error}`);
      }
      */
    });
  });

  describe('#userConfirm()', () => {
    it('should get user password expiry without error', async () => {
      jest.useFakeTimers('legacy');
      const userConfirm = await User.confirm(confirmationId);
      expect(typeof userConfirm.email).toBe('string');
      expect(typeof userConfirm.id).toBe('string');
    });
  });

  // get userinfo by token without error
  describe('#get()', () => {
    it('should get userinfo by token without error', async () => {
      jest.useFakeTimers('legacy');
      await client.auth.login({ email, password });
      const user = client.currentUser;
      // expect response
      expect(typeof user!.userName).toBe('string');
      expect(typeof user!.email).toBe('string');
      expect(typeof user!.profilePicture).toBe('string');
      expect(typeof user!.id).toBe('string');
      expect(typeof user!.currentWorkspace.id).toBe('string');
      expect(typeof user!.isWorkspaceAdmin).toBe('string');
    });
  });

  describe('#usernameExists()', () => {
    it('should add user to workspace without error', async () => {
      jest.useFakeTimers('legacy');
      /*
      const user = new User(url, tokenUs);
      const payload: UsernameExistsPl = {
        current_workspace_id: workspaceId,
        email: 'abc@gmail.com',
        user_code: 'test add user',
        username: 'abc',
        group_id: groupId,
      }
      const { usernameExists, error } = await user.add(payload);

      // expect response getPasswordExpire
      if (usernameExists) {
        userNameExistsResp = usernameExists;
        expect(typeof usernameExists?.user_profile?.email).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
      */
    });
  });

  describe('#postInviteUsers()', () => {
    it('should add user to workspace without error', async () => {
      jest.useFakeTimers('legacy');
      const res = await client.currentWorkspace?.invite(['test@hexabase.com'], 'test.hexabase.com');
      expect(typeof res![0].email).toBe('string');
    });
  });

});
