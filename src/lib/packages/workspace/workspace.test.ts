import { ArchiveWorkspace, SetWsInput, WorkspaceSettingReq, WorkspacesRes } from '../../types/workspace';
import Workspace from '.';
import Auth from '../auth';
import HexabaseClient from '../../../HexabaseClient';
require('dotenv').config();
/**
 * Test with class Workspace
 * @cmdruntest yarn jest src/lib/packages/workspace/workspace.test.ts
 */

const tokenWs = process.env.TOKEN || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

const client = new HexabaseClient();
let workspace: Workspace;

/** run first testing  */
beforeAll(async () => {
  try {
    await client.login({ email, password, token: tokenWs });
    const ary = await client.workspaces();
    ary.forEach(async (workspace) => {
      if (workspace.name === 'new Workspace') {
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
      workspace = await client.workspace();
      workspace.name = 'new Workspace';
      await workspace.save();
      expect(typeof workspace.id).toBe('string');
      client.setWorkspace(workspace);
      // await workspace.archive();
    });
  });

  // testing get all workspaces
  describe('#setCurrent()', () => {
    it('should set current workspace', async () => {
      jest.useFakeTimers('legacy');
      const { workspace } = await client.workspacesWithCurrent();
      const bol = await client.setWorkspace(workspace);
      expect(bol).toEqual(true);
    });
  });

  describe('#getCurrent()', () => {
    it('should get workspaces id current', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      // expect response
      expect(typeof workspace.id).toBe('string');
    });
  });

  // testing get all workspaces
  describe('#get()', () => {
    it('should get all workspaces', async () => {
      jest.useFakeTimers('legacy');
      const { workspaces, workspace } = await client.workspacesWithCurrent();
      // expect response
      expect(typeof workspace.id).toBe('string');
      expect(typeof workspaces[0].name).toBe('string');
      expect(typeof workspaces[0].id).toBe('string');
    });
  });

  describe('#getDetail()', () => {
    it('should get workspace detail by id', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      await workspace.fetch();
      expect(typeof workspace.id).toBe('string');
      expect(typeof workspace.name).toBe('string');
    });
  });

  describe('#updateWorkspaceSettings', () => {
    it('should update workspace settings', async () => {
      // jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const newName = 'new ws name';
      workspace.name = newName;
      // TODO: Fix API
      // const bol = await workspace.save();
      // expect(bol).toEqual(true);
      // expect(workspace.name).toEqual(newName);
    });
  });

  describe('#getPasswordPolicy()', () => {
    it('should get workspace password policy', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const passwordPolicy = await workspace.passwordPolicy();
      // expect response
      expect(typeof passwordPolicy.expiredDay).toBe('number');
      expect(typeof passwordPolicy.useExpiredDay).toBe('boolean');
    });
  });

  describe('#getFunctionality()', () => {
    it('should get workspace functionlity', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const workspaceFunction = await workspace.functionality();
      expect(typeof workspaceFunction.workspace.id).toBe('string');
    });
  });

  describe('#getUsage()', () => {
    it('should get workspace usage', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const wsUsage = await workspace.usage();
      // console.log(wsUsage);
      expect(typeof wsUsage.workspace.id).toBe('string');
      expect(typeof wsUsage.datastores).toBe('number');
    });
  });

  describe('#getGroupChildren()', () => {
    it('should get workspace childrent in group', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const group = await workspace.group();
      // expect response
      expect(typeof (await group.groups()).length).toBe('number');
    });
  });

  describe('#getWorkspace()', () => {
    it('should get workspace by name in Japanese', async () => {
      jest.useFakeTimers('legacy');
      const workspace = await client.workspace(process.env['WORKSPACE_NAME_JA']);
      expect(workspace.name).toEqual(process.env['WORKSPACE_ID']);
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
      try {
        await workspace.archive();
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    });
  });
});
