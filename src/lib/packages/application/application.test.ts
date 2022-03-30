import Application from '.';

/**
 * Test with class Application
 * @cmdruntest yarn jest src/lib/packages/application/application.test.ts
 */
const url = 'https://hxb-graph.hexabase.com/graphql';
const tokenHxb = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDg4ODc1NDYsImlhdCI6MTY0ODU0MTk0Niwic3ViIjoiNjIwZjU3NWJkYjAwMGNiYTk4YjY1ZDczIiwidW4iOiJVc2VyTmFtZVRlc3QifQ.ZXS5bRxFqApUulffUFpsg3Cq6YX8IpNYsh4so85zXTu9q2OOHqR0561gebDn5qT5jqomhAS4IXeAjnfx0pDWqJBp00XAQPORBHJLwuH_5VposwKsQNwQJPLN9EXHgLC_xAHKQAZHCoJ-Qi63XRmSLUX8ouXjPXzvD9ST_gM0YA-l9ObsBZDUJLO5bX79jRnKvDXZCJQ7InbvNYvCISnpI5bpY5KJTLAlULk8sxD2NBrcRvJ-lCDPVKKWMWRi0X7LkyuKzK5WyrjEiebFM5VWXuW99g2pppjKV6WQFgX3ikjVMpqGmtGkKB2L4tCEImlc-h4mShprnnuJsStdTBLEDA';
const workspaceId = '620f5774bb0b83cfd6b83d8f';

// get applications info by workspace id
describe('Application', () => {
  describe('#hexabaseGetApplicationAndDataStoreAsync()', () => {
    it('should get applications info by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(
        url,
        tokenHxb
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
