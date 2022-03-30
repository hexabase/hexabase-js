import Workspace from '.';

/**
 * Test with class Workspace
 * @cmdruntest yarn jest src/lib/packages/workspace/workspace.test.ts
 */
const url = 'https://hxb-graph.hexabase.com/graphql';
const tokenHxb = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDg4ODc1NDYsImlhdCI6MTY0ODU0MTk0Niwic3ViIjoiNjIwZjU3NWJkYjAwMGNiYTk4YjY1ZDczIiwidW4iOiJVc2VyTmFtZVRlc3QifQ.ZXS5bRxFqApUulffUFpsg3Cq6YX8IpNYsh4so85zXTu9q2OOHqR0561gebDn5qT5jqomhAS4IXeAjnfx0pDWqJBp00XAQPORBHJLwuH_5VposwKsQNwQJPLN9EXHgLC_xAHKQAZHCoJ-Qi63XRmSLUX8ouXjPXzvD9ST_gM0YA-l9ObsBZDUJLO5bX79jRnKvDXZCJQ7InbvNYvCISnpI5bpY5KJTLAlULk8sxD2NBrcRvJ-lCDPVKKWMWRi0X7LkyuKzK5WyrjEiebFM5VWXuW99g2pppjKV6WQFgX3ikjVMpqGmtGkKB2L4tCEImlc-h4mShprnnuJsStdTBLEDA';

// testing get all workspaces
describe('Workspace', () => {
  describe('#hexabaseWorspacesAsync()', () => {
    it('should get all workspaces', async () => {
      jest.useFakeTimers('legacy');
      const workspace = new Workspace(
        url,
        tokenHxb
      );

      const workspaces = await workspace.hexabaseWorspacesAsync();

      // expect response
      expect(typeof workspaces.workspaces.current_workspace_id).toBe('string');
      expect(typeof workspaces.workspaces.workspaces[0].workspace_name).toBe('string');
      expect(typeof workspaces.workspaces.workspaces[0].workspace_id).toBe('string');
    });
  });
});
