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


describe('Role', () => {
  describe('#get()', () => {
    it('should get roles by project', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const project = await workspace.project(projectId);
      const roles = await project.roles();
      expect(roles.length).toBeGreaterThan(0);
      const role = roles[0];
      expect(role.id).toBeDefined();
      expect(role.project.id).toBe(projectId);
    });
  });
});
