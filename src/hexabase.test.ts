import { createClient } from './index';
import Auth from './lib/packages/auth';
import AuthMw from './lib/packages/middlware/auth';
require('dotenv').config();
jest.useRealTimers();
/**
 * Test with class Hexabase
 * @cmdruntest yarn jest src/hexabase.test.ts
 */

const proUrl = process.env.PROD_URL || '';
const stagUrl = process.env.STAG_URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const prodEmail = process.env.EMAIL || '';
const prodPassword = process.env.PASSWORD || '';
const stagToken = process.env.STAG_TOKEN || '';
const prodToken = process.env.PROD_TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const tokenClient = process.env.TOKEN || '';

// beforeAll(async () => {
//   if (email && password) {
//     console.log("email, password", email, password);
//     const auth = new Auth(stagUrl);
//     const { token, error } = await auth.login({ email, password });
//     if (token) {
//       return (tokenClient = token);
//     } else {
//       throw Error(`Need login faild to initialize sdk: ${error}`);
//     }
//   }
// });

// testing createClient
describe('Hexabase', () => {
  describe('#createClient()', () => {
    it('get createClient and testing with url, email, password', async () => {
      jest.useFakeTimers();
      // with 3 params: base url, user's email and password
      console.log('stagUrl', stagUrl);
      const hexabase = await createClient({
        url: stagUrl,
        email,
        password,
      });
      const { wsCurrent, error } = await hexabase.workspaces.getCurrent();
      if (wsCurrent) {
        expect(typeof wsCurrent.workspace_id).toBe('string');
      }
    });
  });

  describe('#createClient()', () => {
    it('get createClient and testing with url and token', async () => {
      jest.useFakeTimers();
      const hexabase = await createClient({ url: stagUrl, token: stagToken });
      const { wsCurrent, error } = await hexabase.workspaces.getCurrent();
      if (wsCurrent) {
        expect(typeof wsCurrent.workspace_id).toBe('string');
      }
    });
  });

  describe('#createClient()', () => {
    it('get createClient and testing with email, password', async () => {
      jest.useFakeTimers();
      const hexabase = await createClient({
        email: prodEmail,
        password: prodPassword,
      });
      const { wsCurrent, error } = await hexabase.workspaces.getCurrent();
      if (wsCurrent) {
        expect(typeof wsCurrent.workspace_id).toBe('string');
      }
    });
  });
  describe('#createClient()', () => {
    it('get createClient and testing with just token', async () => {
      jest.useFakeTimers();
      // with 2 params: only user's email and password (without base url)
      const hexabase = await createClient({
        token: prodToken,
      });
      const { wsCurrent, error } = await hexabase.workspaces.getCurrent();
      if (wsCurrent) {
        expect(typeof wsCurrent.workspace_id).toBe('string');
      }
    });
  });

  // describe('#getFile()', () => {
  //   it('application: get createClient and testing', async () => {
  //     jest.useFakeTimers('legacy');
  //     const hexabase = await createClient({ url, token: tokenClient });

  //     console.log('Test: class storage get file');
  //     const {file, error} = await hexabase.storage.getFile(fileId);
  //     if (file) {
  //       // console.log('appAndDs', appAndDs);
  //       expect(typeof file).toBe('string');
  //     }
  //   });
  // });
});
