import Workspace from '.';
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
const setCurrentWorkSpaceInput = {
  workspace_id: '624bc3cfa72c942744ee6635'
};


/** run first testing  */
beforeAll( async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const authMw = new AuthMw(url);
    const {token, error} = await authMw.loginAsync({email, password});
    if (token) {
      return tokenWs = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Workspace', () => {

  // testing get all workspaces
  describe('#createWorkspaceAsync()', () => {
    it('should create workspace', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {w_id, error} = await workspace.createWorkspaceAsync(createWorkSpaceInput);

      // expect response
      if (w_id) {
        // console.log('workspaces created', w_id);

        expect(typeof w_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  // testing get all workspaces
  describe('#setCurrentWsAsync()', () => {
    it('should set current workspace', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {data, error} = await workspace.setCurrentWsAsync(setCurrentWorkSpaceInput);

      // expect response
      if (data) {
        // console.log('set workspace current: ', data);

        expect(typeof data.success).toBe('boolean');
        expect(typeof data.data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  // testing get all workspaces
  describe('#workspacesAsync()', () => {
    it('should get all workspaces', async () => {
      jest.useFakeTimers('legacy');

      const workspace = new Workspace(url, tokenWs);
      const {workspaces, error} = await workspace.workspacesAsync();

      // expect response
      if (workspaces) {
        // console.log('workspaces', workspaces);

        expect(typeof workspaces.current_workspace_id).toBe('string');
        expect(typeof workspaces.workspaces[0].workspace_name).toBe('string');
        expect(typeof workspaces.workspaces[0].workspace_id).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  // describe('#workspacesCurrentAsync()', () => {
  //   it('should get workspaces id current', async () => {
  //     jest.useFakeTimers('legacy');

  //     const workspace = new Workspace(url, tokenWs);
  //     const {wsCurrent, error} = await workspace.wsCurrentAsync();

  //     // expect response
  //     if (wsCurrent) {
  //       // console.log('wsCurrent', wsCurrent);

  //       expect(typeof wsCurrent.workspace_id).toBe('string');
  //     } else {
  //       throw new Error(`Error: ${error}`);
  //     }
  //   });
  // });

  // describe('#wsPasswordPolicyAsync()', () => {
  //   it('should get workspace password policy', async () => {
  //     jest.useFakeTimers('legacy');

  //     const workspace = new Workspace(url, tokenWs);
  //     const {wsPasswordPolicy, error} = await workspace.wsPasswordPolicyAsync(workspaceId);

  //     // expect response
  //     if (wsPasswordPolicy) {
  //       // console.log('wsPasswordPolicy', wsPasswordPolicy);

  //       expect(typeof wsPasswordPolicy.expired_day).toBe('number');
  //       expect(typeof wsPasswordPolicy.use_expired_day).toBe('boolean');
  //     } else {
  //       throw new Error(`Error: ${error}`);
  //     }
  //   });
  // });

  // describe('#wsFunctionalityAsync()', () => {
  //   it('should get workspace functionlity', async () => {
  //     jest.useFakeTimers('legacy');

  //     const workspace = new Workspace(url, tokenWs);
  //     const {wsFunctionality, error} = await workspace.wsFunctionalityAsync(workspaceId);

  //     // expect response
  //     if (wsFunctionality) {
  //       // console.log('wsFunctionality: ', wsFunctionality);

  //       expect(typeof wsFunctionality.w_id).toBe('string');
  //     } else {
  //       throw new Error(`Error: ${error}`);
  //     }
  //   });
  // });

  // describe('#wsUsageAsync()', () => {
  //   it('should get workspace usage', async () => {
  //     jest.useFakeTimers('legacy');

  //     const workspace = new Workspace(url, tokenWs);
  //     const {wsUsage, error} = await workspace.wsUsageAsync(workspaceId);

  //     // expect response
  //     if (wsUsage) {
  //       // console.log('wsUsage: ', wsUsage);

  //       expect(typeof wsUsage.w_id).toBe('string');
  //       expect(typeof wsUsage.usage?.datastores).toBe('number');
  //     } else {
  //       throw new Error(`Error: ${error}`);
  //     }
  //   });
  // });

  // describe('#wsGroupChildrenAsync()', () => {
  //   it('should get workspace childrent in group', async () => {
  //     jest.useFakeTimers('legacy');

  //     const workspace = new Workspace(url, tokenWs);
  //     const {wsGroupChildren, error} = await workspace.wsGroupChildrenAsync(workspaceId);

  //     // expect response
  //     if (wsGroupChildren) {
  //       // console.log('wsGroupChildren: ', wsGroupChildren);

  //       expect(typeof wsGroupChildren.error).toBe('string');
  //       expect(typeof wsGroupChildren.count).toBe('number');
  //     } else {
  //       throw new Error(`Error: ${error}`);
  //     }
  //   });
  // });

  // describe('#taskQueueListAsync()', () => {
  //   it('should get queue list', async () => {
  //     jest.useFakeTimers('legacy');

  //     const workspace = new Workspace(url, tokenWs);
  //     const {taskQueueList, error} = await workspace.taskQueueListAsync();

  //     // expect response
  //     if (taskQueueList) {
  //       // console.log('taskQueueList: ', taskQueueList);
  //       expect(typeof taskQueueList).toBe('object');

  //     } else {
  //       throw new Error(`Error: ${error}`);
  //     }
  //   });
  // });

  // describe('#taskQueueStatusAsync()', () => {
  //   it('should get task queue status', async () => {
  //     jest.useFakeTimers('legacy');

  //     const workspace = new Workspace(url, tokenWs);
  //     const {taskQueueStatus, error} = await workspace.taskQueueStatusAsync(taskId, workspaceId);

  //     // expect response
  //     if (taskQueueStatus) {
  //       console.log('taskQueueStatus: ', taskQueueStatus);

  //       expect(typeof taskQueueStatus.qt_id).toBe('string');
  //       expect(typeof taskQueueStatus.category).toBe('string');
  //       expect(typeof taskQueueStatus.created_at).toBe('string');
  //     } else {
  //       throw new Error(`Error: ${error}`);
  //     }
  //   });
  // });
});
