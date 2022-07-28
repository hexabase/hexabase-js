import { SetWsInput, WorkspacesRes } from '../../types/workspace';
import Workspace from '.';
import Auth from '../auth';
import AuthMw from '../middlware/auth';
require('dotenv').config();
/**
 * Test with class Workspace
 * @cmdruntest yarn jest src/lib/packages/workspace/workspace.test.ts
 */

const url = process.env.URL || '';
let tokenWs = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const taskId = process.env.TASKID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

// local variable in file for testing
const createWorkSpaceInput = {
  name: 'new Workspace'
};



/** run first testing  */
beforeAll( async () => {
  if (email && password) {
    const auth = new Auth(url);
    const {token, error} = await auth.login({email, password});
    if (token) {
      return tokenWs = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Workspace', () => {

  // testing get all workspaces
  describe('#create()', () => {
    it('should create workspace', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {w_id, error} = await workspace.create(createWorkSpaceInput);

      // expect response
      if (w_id) {

        expect(typeof w_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  // testing get all workspaces
  describe('#setCurrent()', () => {
    it('should set current workspace', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const wsps: WorkspacesRes = await workspace.get();
      if (wsps && wsps.workspaces && wsps.workspaces.current_workspace_id) {
        const setCurrentWsPl: SetWsInput = {
          workspace_id: wsps.workspaces?.current_workspace_id
        };
        const {data, error} = await workspace.setCurrent(setCurrentWsPl);
        
        // expect response
        if (data) {
          
          expect(typeof data.success).toBe('boolean');
          expect(typeof data.data).toBe('object');
        } else {
          throw new Error(`Error: ${error}`);
        }
      }
    });
  });

  // testing get all workspaces
  describe('#get()', () => {
    it('should get all workspaces', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {workspaces, error} = await workspace.get();

      // expect response
      if (workspaces) {

        expect(typeof workspaces.current_workspace_id).toBe('string');
        expect(typeof workspaces.workspaces[0].workspace_name).toBe('string');
        expect(typeof workspaces.workspaces[0].workspace_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getCurrent()', () => {
    it('should get workspaces id current', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {wsCurrent, error} = await workspace.getCurrent();

      // expect response
      if (wsCurrent) {

        expect(typeof wsCurrent.workspace_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getPasswordPolicy()', () => {
    it('should get workspace password policy', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {wsPasswordPolicy, error} = await workspace.getPasswordPolicy(workspaceId);

      // expect response
      if (wsPasswordPolicy) {

        expect(typeof wsPasswordPolicy.expired_day).toBe('number');
        expect(typeof wsPasswordPolicy.use_expired_day).toBe('boolean');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getFunctionality()', () => {
    it('should get workspace functionlity', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {wsFunctionality, error} = await workspace.getFunctionality(workspaceId);

      // expect response
      if (wsFunctionality) {

        expect(typeof wsFunctionality.w_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getUsage()', () => {
    it('should get workspace usage', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {wsUsage, error} = await workspace.getUsage(workspaceId);

      // expect response
      if (wsUsage) {

        expect(typeof wsUsage.w_id).toBe('string');
        expect(typeof wsUsage.usage?.datastores).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getGroupChildren()', () => {
    it('should get workspace childrent in group', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {wsGroupChildren, error} = await workspace.getGroupChildren(workspaceId);

      // expect response
      if (wsGroupChildren) {

        expect(typeof wsGroupChildren.error).toBe('string');
        expect(typeof wsGroupChildren.count).toBe('number');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getTaskQueueList()', () => {
    it('should get queue list', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {taskQueueList, error} = await workspace.getTaskQueueList();

      // expect response
      if (taskQueueList) {

        expect(typeof taskQueueList).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getTaskQueueStatus()', () => {
    it('should get task queue status', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {taskQueueStatus, error} = await workspace.getTaskQueueStatus(taskId, workspaceId);

      // expect response
      if (taskQueueStatus) {

        expect(typeof taskQueueStatus.qt_id).toBe('string');
        expect(typeof taskQueueStatus.category).toBe('string');
        expect(typeof taskQueueStatus.created_at).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});
