import Application from '.';
import AuthMw from '../middlware/auth';
require('dotenv').config();
/**
 * Test with class Application
 * @cmdruntest yarn jest src/lib/packages/application/application.test.ts
 */

const url = process.env.URL || '';
let tokenApp = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const email = process.env.EMAIL || ''
const password = process.env.PASSWORD || ''

beforeAll( async () => {
  if(email && password) {
    console.log('[email, password]: ', email, password);
    const authMw = new AuthMw(url);
    const {token, error} = await authMw.loginAsync({email, password});
    if(token){
      return tokenApp = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

// get applications info by workspace id
describe('Application', () => {
  describe('#getAppAndDsAsync()', () => {
    it('should get applications info by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);

      const {appAndDs, error} = await application.getAppAndDsAsync(workspaceId);
      if(appAndDs) {
        console.log('appAndDs: ', appAndDs)

        expect(typeof appAndDs[0].application_id).toBe('string');
        expect(typeof appAndDs[0].name).toBe('string');
        expect(typeof appAndDs[0].display_id).toBe('string');
      }
      else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});
