import Workspace from '.';
require('dotenv').config()
/**
 * Test with class Workspace
 * @cmdruntest yarn jest src/lib/packages/workspace/workspace.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';

const workspace = new Workspace(
  url,
  token
);

// testing get all workspaces
describe('Workspace', () => {
  describe('#workspacesAsync()', () => {
    it('should get all workspaces', async () => {
      jest.useFakeTimers('legacy');

      const respWorkspaces = await workspace.workspacesAsync();
      console.log("workspaces", respWorkspaces);
      // expect response
      expect(typeof respWorkspaces.workspaces.current_workspace_id).toBe('string');
      expect(typeof respWorkspaces.workspaces.workspaces[0].workspace_name).toBe('string');
      expect(typeof respWorkspaces.workspaces.workspaces[0].workspace_id).toBe('string');
    });
  });

  describe('#workspacesCurrentAsync()', () => {
    it('should get workspaces id current', async () => {
      jest.useFakeTimers('legacy');

      const respWsCurrent = await workspace.wsCurrentAsync();
      console.log("respWsCurrent", respWsCurrent);

      // expect response
      expect(typeof respWsCurrent.workspaceCurrent.workspace_id).toBe('string');
    });
  });

  describe('#wsPasswordPolicyAsync()', () => {
    it('should get workspace password policy', async () => {
      jest.useFakeTimers('legacy');

      const respWsPsPolicy = await workspace.wsPasswordPolicyAsync(workspaceId);
      console.log("respWsPsPolicy", respWsPsPolicy);

      // expect response
      expect(typeof respWsPsPolicy.workspacePasswordPolicy.expired_day).toBe('number');
      expect(typeof respWsPsPolicy.workspacePasswordPolicy.use_expired_day).toBe('boolean');
    });
  });

  describe('#wsFunctionalityAsync()', () => {
    it('should get workspace functionlity', async () => {
      jest.useFakeTimers('legacy');

      const respWsFc= await workspace.wsFunctionalityAsync(workspaceId);
      console.log("respWsFc", respWsFc);

      // expect response
      expect(typeof respWsFc.workspaceFunctionality.w_id).toBe('string');
    });
  });

  describe('#wsUsageAsync()', () => {
    it('should get workspace usage', async () => {
      jest.useFakeTimers('legacy');

      const respWsUsage = await workspace.wsUsageAsync(workspaceId);
      console.log("respWsUsage", respWsUsage);

      // expect response
      expect(typeof respWsUsage.workspaceUsage.w_id).toBe('string');
      expect(typeof respWsUsage.workspaceUsage.usage?.datastores).toBe('number');
    });
  });

  describe('#wsGetGroupChildrenAsync()', () => {
    it('should get workspace childrent in group', async () => {
      jest.useFakeTimers('legacy');

      const respWsGrChil = await workspace.wsGetGroupChildrenAsync(workspaceId);
      console.log("respWsGrChil", respWsGrChil);

      // expect response
      expect(typeof respWsGrChil.workspaceGetGroupChildren.error).toBe('string');
      expect(typeof respWsGrChil.workspaceGetGroupChildren.count).toBe('number');
    });
  });
});
