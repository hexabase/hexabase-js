import Storage from '.';
import Auth from '../auth';
require('dotenv').config();
/**
 * Test with class User
 * @cmdruntest yarn jest src/lib/packages/user/user.test.ts
 */

let getDownloadFileId = process.env.FILE_ID || '';
let tokenStr = process.env.TOKEN || '';
const url = process.env.URL || '';
const confirmationId = process.env.CONFIRMATIONID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });
    if (token) {
      return tokenStr = token;
    } else {
      throw Error(`Need login fail to initialize sdk: ${error}`);
    }
  }
});
// testing storage
describe('User', () => {
  describe('#GetDownloadFile()', () => {
    it('should get download file without error', async () => {
      jest.useFakeTimers('legacy');
      const storage = new Storage(url, tokenStr);
      const { getDownloadFile, error } = await storage.GetDownloadFile(getDownloadFileId);
      // expect response getPasswordExpire
      if (getDownloadFile) {
        expect(typeof getDownloadFile).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#deleteStorage()', () => {
    it('should delete file without error', async () => {
      jest.useFakeTimers('legacy');
      const storage = new Storage(url, tokenStr);
      const { data, error } = await storage.deleteStorage(getDownloadFileId);
      // expect response getPasswordExpire
      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

});
