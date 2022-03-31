import Workspace from '.';
require('dotenv').config()
/**
 * Test with class Workspace
 * @cmdruntest yarn jest src/lib/packages/workspace/workspace.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';
// testing get all workspaces
describe('Workspace', () => {
  describe('#workspacesAsync()', () => {
    it('should get all workspaces', async () => {
      jest.useFakeTimers('legacy');
      const workspace = new Workspace(
        url,
        token
      );

      const workspaces = await workspace.workspacesAsync();

      // expect response
      expect(typeof workspaces.workspaces.current_workspace_id).toBe('string');
      expect(typeof workspaces.workspaces.workspaces[0].workspace_name).toBe('string');
      expect(typeof workspaces.workspaces.workspaces[0].workspace_id).toBe('string');
    });
  });
});
