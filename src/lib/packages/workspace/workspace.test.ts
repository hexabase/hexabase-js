import { ArchiveWorkspace, SetWsInput, WorkspaceSettingReq, WorkspacesRes } from '../../types/workspace';
import Workspace from '.';
import Auth from '../auth';
import HexabaseClient from '../../../HexabaseClient';
require('dotenv').config();
/**
 * Test with class Workspace
 * @cmdruntest yarn jest src/lib/packages/workspace/workspace.test.ts
 */

const url = process.env.URL || '';
let tokenWs = process.env.TOKEN || '';
const taskId = process.env.TASKID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

let newWorkspaceId = '';

// local variable in file for testing
const createWorkSpaceInput = {
  name: 'new Workspace'
};

const updateWorkspaceSettingsInput: any = {
  payload: {}
};

const client = new HexabaseClient;

/** run first testing  */
beforeAll(async () => {
  try {
    await client.login({ email, password, token: tokenWs });
    const ary = await client.workspaces();
    ary.forEach(async (workspace) => {
      if (workspace.name === 'new ws name') {
        await workspace.archive();
      }
    });
  } catch (error) {
    console.log(`Error in login ${error}`);
    process.exit(1);
  }
});

describe('Workspace', () => {
  // testing get all workspaces
  describe('#create()', () => {
    it('should create workspace', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.workspace();
      workspace.name = 'new Workspace';
      workspace.workspaceId = 'newWorkspaceId';
      try {
        await workspace.save();
        newWorkspaceId = workspace.id;
        expect(typeof workspace.id).toBe('string');
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  // testing get all workspaces
  describe('#setCurrent()', () => {
    it('should set current workspace', async () => {
      jest.useFakeTimers('legacy');
      const { workspace } = await client.workspacesWithCurrent();
      try {
        const bol = await client.setWorkspace(workspace);
        expect(bol).toEqual(true);
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getCurrent()', () => {
    it('should get workspaces id current', async () => {
      jest.useFakeTimers('legacy');
      try {
        const workspace = client.currentWorkspace!;
        // expect response
        expect(typeof workspace.id).toBe('string');
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  // testing get all workspaces
  describe('#get()', () => {
    it('should get all workspaces', async () => {
      jest.useFakeTimers('legacy');
      try {
        const { workspaces, workspace } = await client.workspacesWithCurrent();
        // expect response
        expect(typeof workspace.id).toBe('string');
        expect(typeof workspaces[0].name).toBe('string');
        expect(typeof workspaces[0].id).toBe('string');
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getDetail()', () => {
    it('should get workspace detail by id', async () => {
      jest.useFakeTimers('legacy');
      try {
        const workspace = client.currentWorkspace!;
        await workspace.getDetail();
        expect(typeof workspace.id).toBe('string');
        expect(typeof workspace.name).toBe('string');
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#updateWorkspaceSettings', () => {
    it('should update workspace settings', async () => {
      // jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      try {
        const newName = 'new ws name';
        workspace.name = newName;
        // TODO: Fix API
        // const bol = await workspace.save();
        // expect(bol).toEqual(true);
        await workspace.getDetail();
        // expect(workspace.name).toEqual(newName);
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getPasswordPolicy()', () => {
    it('should get workspace password policy', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      try {
        const passwordPolicy = await workspace.getPasswordPolicy();
        // expect response
        expect(typeof passwordPolicy.expiredDay).toBe('number');
        expect(typeof passwordPolicy.useExpiredDay).toBe('boolean');
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getFunctionality()', () => {
    it('should get workspace functionlity', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      try {
        const workspaceFunction = await workspace.getFunctionality();
        expect(typeof workspaceFunction.workspace.id).toBe('string');
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getUsage()', () => {
    it('should get workspace usage', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const wsUsage = await workspace.getUsage();
      expect(typeof wsUsage.workspace.id).toBe('string');
      expect(typeof wsUsage.datastores).toBe('number');
    });
  });
  
  describe('#getGroupChildren()', () => {
    it('should get workspace childrent in group', async () => {
      jest.useFakeTimers('legacy');
      // const workspace = await client.workspaces.getCurrent();
      const workspace = await client.workspace('62bac0f0a65b33ec0c212a67');
      try {
        const group = await workspace.getGroup();
        // expect response
        if (group) {
          expect(typeof group.children.length).toBe('number');
        }
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });
  
  /*
  TODO: need type of taskQueueList
  describe('#getTaskQueueList()', () => {
    it('should get queue list', async () => {
      jest.useFakeTimers('legacy');
      const workspace = await client.workspaces.getCurrent();
      const { taskQueueList, error } = await workspace.getTaskQueueList();
      // expect response
      if (taskQueueList) {
        expect(typeof taskQueueList).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });
  */
  /*
  describe('#getTaskQueueStatus()', () => {
    it('should get task queue status', async () => {
      jest.useFakeTimers('legacy');
      const workspace = await client.workspaces.getCurrent();
      try {
        if (newWorkspaceId) {
          const { taskQueueStatus, error } = await workspace.getTaskQueueStatus(taskId, newWorkspaceId);
          // expect response
          if (taskQueueStatus) {
            expect(typeof taskQueueStatus.qt_id).toBe('string');
            expect(typeof taskQueueStatus.category).toBe('string');
            expect(typeof taskQueueStatus.created_at).toBe('string');
          } else {
            throw new Error(`Error: ${error}`);
          }
        }
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });
  */

  describe('#archiveWorkspace', () => {
    it('should archive workspace', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      try {
        await workspace.archive();
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});
