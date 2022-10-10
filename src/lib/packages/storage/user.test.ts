import Storage from '.';
import Auth from '../auth';
require('dotenv').config();
/**
 * Test with class User
 * @cmdruntest yarn jest src/lib/packages/user/user.test.ts
 */

const url = process.env.URL || '';
let tokenUs = process.env.TOKEN || '';
const confirmationId = process.env.CONFIRMATIONID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });
    if (token) {
      return tokenUs = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});
// testing storage
describe('User', () => {
  describe('#GetDownloadFile()', () => {
    it('should get download file without error', async () => {
      jest.useFakeTimers('legacy');
      const storage = new Storage(url, tokenUs);
      const { data, error } = await storage.GetDownloadFile();
      // expect response getPasswordExpire
      if (data) {
        expect(typeof data).toBe('any');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

});
