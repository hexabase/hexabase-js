import Application from '.';
require('dotenv').config()
/**
 * Test with class Application
 * @cmdruntest yarn jest src/lib/packages/application/application.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';

// get applications info by workspace id
describe('Application', () => {
  describe('#hexabaseGetApplicationAndDataStoreAsync()', () => {
    it('should get applications info by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(
        url,
        token
      );

      const respApplications = await application.hexabaseGetApplicationAndDataStoreAsync(workspaceId);
      console.log('applications', respApplications);

      // expect response
      expect(typeof respApplications.getApplicationAndDataStore[0].application_id).toBe('string');
      expect(typeof respApplications.getApplicationAndDataStore[0].name).toBe('string');
      expect(typeof respApplications.getApplicationAndDataStore[0].display_id).toBe('string');
    });
  });
});
