import Application from '.';
require('dotenv').config();
/**
 * Test with class Application
 * @cmdruntest yarn jest src/lib/packages/application/application.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';

// get applications info by workspace id
describe('Application', () => {
  describe('#getAppAndDsAsync()', () => {
    it('should get applications info by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(
        url,
        token
      );

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
