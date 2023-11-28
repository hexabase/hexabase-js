require('dotenv').config();

import { HexabaseClient } from '../../../';

const confirmationId = process.env.CONFIRMATION_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const groupId = process.env.GROUP_ID || '';

const client = new HexabaseClient();

beforeAll(async () => {
  const token = client.login({ email, password });
  return token;
});

describe('User', () => {
  describe('#register()', () => {
    it('should get user register info by confirm id without error', async () => {
      /*
      jest.useFakeTimers('legacy');
      const userRegister = await User.confirm(confirmationId);
      // expect response respUserRegister
      expect(typeof userRegister.id).toBe('string');
      expect(typeof userRegister.email).toBe('string');
      */
    });
  });

  describe('passwordExpired function', () => {
    it('should get user password expiry without error', async () => {
      const result = await client.currentUser!.passwordExpired();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('#userConfirm()', () => {
    it('should get user password expiry without error', async () => {
      /*
      jest.useFakeTimers('legacy');
      const userConfirm = await User.confirm(confirmationId);
      expect(typeof userConfirm.email).toBe('string');
      expect(typeof userConfirm.id).toBe('string');
      */
    });
  });

  describe('get function', () => {
    it('should get userinfo', async () => {
      const user = client.currentUser;
      expect(user!.email).toBe(email);
      expect(typeof user!.userName).toBe('string');
      expect(typeof user!.profilePicture).toBe('string');
      expect(typeof user!.id).toBe('string');
      // TODO should check current worlspace
      // expect(typeof user!.currentWorkspace.id).toBe('string');
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
      /*
      jest.useFakeTimers('legacy');
      const res = await client.currentWorkspace?.invite(['test@hexabase.com'], 'test.hexabase.com');
      expect(typeof res![0].email).toBe('string');
      */
    });
  });

});
