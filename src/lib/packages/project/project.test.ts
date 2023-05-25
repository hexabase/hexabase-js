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

let projectId = process.env.APPLICATIONID || '';
let tokenApp = process.env.TOKEN || '';
let workspaceId = process.env.WORKSPACEID || '';
const url = process.env.URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

const client = new HexabaseClient();

// local variable in file for testing
beforeAll(async () => {
  await client.login({ email, password, token: tokenApp });
});

describe('Project', () => {
  describe('#get()', () => {
    it('should get project by workspace id', async () => {
      try {
        jest.useFakeTimers('legacy');
        const workspace = client.currentWorkspace!;
        const projects = await workspace.projects();
        expect(typeof projects[0].id).toBe('string');
      } catch (error) {
        console.error(error);
      }
    });
  });

  describe('#getProjectsAndDatastores()', () => {
    it('should get project and datastore by workspace id', async () => {
      jest.useFakeTimers('legacy');
      try {
        const workspace = client.currentWorkspace!;
        const { projects, datastores } = await workspace.projectsAndDatastores();
        const project = projects[0];
        expect(typeof project.id).toBe('string');
        const name = project.name as FieldNameENJP;
        expect(typeof name.en).toBe('string');
        expect(typeof project.displayId).toBe('string');

        const datastore = datastores[0];
        if (datastore) {
          expect(typeof datastore.id).toBe('string');
          expect(typeof datastore.name).toBe('string');
        }
      } catch (error) {
        console.error(error);
      }
    });
  });

  describe('#getTemplates()', () => {
    it('should get templates without error', async () => {
      jest.useFakeTimers('legacy');
      try {
        const workspace = client.currentWorkspace!;
        const templates = await workspace.projectTemplates();
        expect(typeof templates[0].name).toBe('string');
      } catch (error) {
        console.error(error);
      }
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
    });
  });


  describe('#getDetail()', () => {
    it('should get info project', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const projects = await workspace.projects();
      const project = projects[0];
      await project.fetch();
      const name = project.name as FieldNameENJP;
      expect(typeof name.ja).toBe('string');
      expect(name.ja !== '').toBe(true);
      expect(typeof name.en).toBe('string');
    });
  });

  describe('#updateProjectTheme()', () => {
    it('should update project by id project current without error', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const projects = await workspace.projects();
      const project = projects[0];
      project.theme = 'blue';
      await project.save();
      await project.fetch();
      expect(project.theme).toBe('blue');
    });
  });

  describe('#updateProjectName()', () => {
    it('should update project by id project current without error', async () => {
      jest.useFakeTimers('legacy');
      const workspace = client.currentWorkspace!;
      const projects = await workspace.projects();
      const project = projects[0];
      project.name = {
        en: 'test update',
        ja: 'test update',
      };
      const bol = await project.save();
      expect(bol).toBe(true);
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
