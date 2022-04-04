import Workspace from '.';
require('dotenv').config();
/**
 * Test with class Workspace
 * @cmdruntest yarn jest src/lib/packages/workspace/workspace.test.ts
 */

const url = process.env.URL || '';
const token = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const taskId = process.env.TASKID || '';

const workspace = new Workspace(
  url,
  token
);

// testing get all workspaces
describe('Workspace', () => {
  describe('#workspacesAsync()', () => {
    it('should get all workspaces', async () => {
      jest.useFakeTimers('legacy');

      const {workspaces, error} = await workspace.workspacesAsync();

      // expect response
      if(workspaces) {
        console.log('workspaces', workspaces);

        expect(typeof workspaces.current_workspace_id).toBe('string');
        expect(typeof workspaces.workspaces[0].workspace_name).toBe('string');
        expect(typeof workspaces.workspaces[0].workspace_id).toBe('string');
      }else{
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#workspacesCurrentAsync()', () => {
    it('should get workspaces id current', async () => {
      jest.useFakeTimers('legacy');

      const {wsCurrent, error} = await workspace.wsCurrentAsync();
      
      // expect response
      if(wsCurrent) {
        console.log('wsCurrent', wsCurrent);

        expect(typeof wsCurrent.workspace_id).toBe('string');
      }else{
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#wsPasswordPolicyAsync()', () => {
    it('should get workspace password policy', async () => {
      jest.useFakeTimers('legacy');

      const {wsPasswordPolicy, error} = await workspace.wsPasswordPolicyAsync(workspaceId);

      // expect response
      if(wsPasswordPolicy) {
        console.log('wsPasswordPolicy', wsPasswordPolicy);
        
        expect(typeof wsPasswordPolicy.expired_day).toBe('number');
        expect(typeof wsPasswordPolicy.use_expired_day).toBe('boolean');
      }else{
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#wsFunctionalityAsync()', () => {
    it('should get workspace functionlity', async () => {
      jest.useFakeTimers('legacy');

      const {wsFunctionality, error} = await workspace.wsFunctionalityAsync(workspaceId);

      // expect response
      if(wsFunctionality) {
        console.log('wsFunctionality: ', wsFunctionality);
        
        expect(typeof wsFunctionality.w_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#wsUsageAsync()', () => {
    it('should get workspace usage', async () => {
      jest.useFakeTimers('legacy');

      const {wsUsage, error} = await workspace.wsUsageAsync(workspaceId);

      // expect response
      if(wsUsage) {
        console.log('wsUsage: ', wsUsage);
        
        expect(typeof wsUsage.w_id).toBe('string');
        expect(typeof wsUsage.usage?.datastores).toBe('number');
      }else{
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#wsGroupChildrenAsync()', () => {
    it('should get workspace childrent in group', async () => {
      jest.useFakeTimers('legacy');

      const {wsGroupChildren, error} = await workspace.wsGroupChildrenAsync(workspaceId);

      // expect response
      if(wsGroupChildren) {
        console.log('wsGroupChildren: ', wsGroupChildren);

        expect(typeof wsGroupChildren.error).toBe('string');
        expect(typeof wsGroupChildren.count).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#taskQueueListAsync()', () => {
    it('should get queue list', async () => {
      jest.useFakeTimers('legacy');

      const {taskQueueList, error} = await workspace.taskQueueListAsync();

      // expect response
      if(taskQueueList) {
        console.log('taskQueueList: ', taskQueueList);
        expect(typeof taskQueueList).toBe('object');
        
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#taskQueueStatusAsync()', () => {
    it('should get task queue status', async () => {
      jest.useFakeTimers('legacy');

      const {taskQueueStatus, error} = await workspace.taskQueueStatusAsync(taskId, workspaceId);

      // expect response
      if(taskQueueStatus) {
        console.log('taskQueueStatus: ', taskQueueStatus);

        expect(typeof taskQueueStatus.qt_id).toBe('string');
        expect(typeof taskQueueStatus.category).toBe('string');
        expect(typeof taskQueueStatus.created_at).toBe('string');
      }else{
        throw new Error(`Error: ${error}`);
      }
    });
  });
});
