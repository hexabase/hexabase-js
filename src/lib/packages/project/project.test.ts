import { DeleteProjectPl, UpdateProjectNamePl, UpdateProjectThemePl } from '../../types/project';
import Project from '.';
import Auth from '../auth';
import Workspace from '../workspace';
import HexabaseClient from '../../../HexabaseClient';
import { FieldNameENJP } from '../../util/type';
require('dotenv').config();
/**
 * Test with class Project
 * @cmdruntest yarn jest src/lib/packages/project/project.test.ts
 */

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

afterAll(async () => {
  // await new Promise(resolve => setTimeout(resolve, 3000));
  const projects = await client.currentWorkspace!.projects();
  for (const project of projects) {
    if (project.name === '新しいプロジェクト') {
      await project.delete();
      // console.log(`Project ${project.id} deleted.`);
    }
  }
});

describe('Project', () => {
  describe('#get()', () => {
    it('should get project by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const projects = await workspace.projects();
      expect(typeof projects[0].id).toBe('string');
    });

    it('should get project by name', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const project = await workspace.project(process.env.PROJECT_NAME_JA || '');
      expect(project.id).toEqual(process.env.PROJECT_ID);
    });
  });

  it('should execute project custom function', async () => {
    jest.useFakeTimers('legacy');
    const workspace = client.currentWorkspace!;
    const project = await workspace.project(projectId);
    const res = await project.execute<{[key: string]: string}>('func', { a: 'b' });
    console.log(res.data);
  });

  describe('#getProjectsAndDatastores()', () => {
    it('should get project and datastore by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const { projects, datastores } = await workspace.projectsAndDatastores();
      const project = projects[0];
      expect(typeof project.id).toBe('string');
      expect(typeof project.name).toBe('string');
      expect(typeof project.displayId).toBe('string');

      const datastore = datastores[0];
      expect(typeof datastore.id).toBe('string');
      expect(typeof datastore.name).toBe('string');
    });
  });

  describe('#getTemplates()', () => {
    it('should get templates without error', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const templates = await workspace.projectTemplates();
      expect(typeof templates[0].name).toBe('string');
    });
  });

  describe('#create()', () => {
    it('should create project', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const project = await workspace.project();
      project.name = {
        ja: '新しいプロジェクト',
        en: 'new project'
      };
      const bol = await project.save();
      expect(bol).toBe(true);
      expect(typeof project.id).toBe('string');
      await project.delete();
    });
  });


  describe('#getDetail()', () => {
    it('should get info project', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const projects = await workspace.projects();
      const project = projects[0];
      await project.fetch();
      // const name = project.name as FieldNameENJP;
      expect(typeof project.name).toBe('string');
      expect(project.name !== '').toBe(true);
      // expect(typeof name).toBe('string');
    });
  });

  describe('#updateProjectTheme()', () => {
    it('should update project by id project current without error', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const projects = await workspace.projects();
      const project = projects[0];
      project.theme = 'blue';
      // await project.save();
      await project.fetch();
      expect(project.theme).toBe('blue');
      // await project.delete();
    });
  });

  describe('#updateProjectName()', () => {
    it('should update project by id project current without error', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const project = await workspace.project();
      project.name = {
        ja: '新しいプロジェクト',
        en: 'new project'
      };
      await project.save();
      expect(typeof project.id).toBe('string');
      project.name = {
        en: 'test update',
        ja: 'test update',
      };
      const bol = await project.save();
      expect(bol).toBe(true);
      await project.fetch();
      expect(project.name.en).toBe('test update');
      await project.delete();
    });
  });

  describe('#delete()', () => {
    it('should delete project by id project current without error', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const project = await workspace.project();
      project.name = {
        ja: '新しいプロジェクト',
        en: 'new project',
      };
      const bol = await project.save();
      expect(bol).toBe(true);
      expect(typeof project.id).toBe('string');
      const res = await project.delete();
      expect(res).toBe(true);
    });
  });
});
