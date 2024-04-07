import { DeleteProjectPl, UpdateProjectNamePl, UpdateProjectThemePl } from '../../types/project';
import Project from '.';
import Auth from '../auth';
import HexabaseClient from '../../../HexabaseClient';
require('dotenv').config();

const workspaceId = process.env.WORKSPACE_ID || '';
const projectId = process.env.PROJECT_ID || '';
const tokenApp = process.env.TOKEN || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

const client = new HexabaseClient();

// local variable in file for testing
beforeAll(async () => {
  await client.login({ email, password, token: tokenApp });
  await client.setWorkspace(workspaceId);
});


describe('Group', () => {
  describe('#get()', () => {
    it('should get group tree by workspace', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const groups = await workspace.groups();
      expect(groups).toBeDefined();
    });
  });

  describe('#create()', () => {
    it('should create group on root in workspace', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const group = await workspace.group();
      group.set('name', 'test group').set('display_id', 'test_group');
      await group.save();
      expect(group.id).toBeDefined();
      const users = await group.users();
      expect(users.length).toBe(1);
      const res = await group.delete();
      expect(res).toBe(true);
    });

    it('should create group on another group in workspace', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const group = await workspace.group();
      group.set('name', 'test group').set('display_id', 'test_group');
      await group.save();
      const group2 = await group.group();
      group2.set('name', 'test group 2').set('display_id', 'test_group_2');
      await group2.save();
      expect(group.id).toBeDefined();
      expect(group2.id).toBeDefined();
      expect(group2._parent.id).toBe(group.id);
      const users = await group.users();
      expect(users.length).toBe(1);
      const users2 = await group2.users();
      expect(users2.length).toBe(1);
      const res2 = await group2.delete();
      expect(res2).toBe(true);
      const res = await group.delete();
      expect(res).toBe(true);
    });
  });
  describe('#update()', () => {
    it('should update group on root in workspace', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const group = await workspace.group();
      group.set('name', 'test group').set('display_id', 'test_group');
      await group.save();
      const newName = 'test group update';
      const newDisplayId = 'test_group_update';
      group.set('name', newName).set('display_id', newDisplayId);
      await group.save();
      expect(group.id).toBeDefined();
      expect(group.name).toBe(newName);
      expect(group.displayId).toBe(newDisplayId);
      const res = await group.delete();
      expect(res).toBe(true);
    });
  });
  describe('#add and remove()', () => {
    it('should update group on root in workspace', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const group = await workspace.group();
      group.set('name', 'test group').set('display_id', 'test_group');
      await group.save();
      expect(group.id).toBeDefined();
      await group.add({ email: process.env.EMAIL_2!, userName: 'demo' });
      const users = await group.users();
      expect(users.length).toBe(2);
      const res = await group.delete();
      expect(res).toBe(true);
    });
  });
});

function getUniqueStr(){
  const strong = 1000;
  return new Date().getTime().toString(16)  + Math.floor(strong * Math.random()).toString(16);
}