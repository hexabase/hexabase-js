import { DeleteProjectPl, UpdateProjectNamePl, UpdateProjectThemePl } from '../../types/project';
import Project from '.';
import Auth from '../auth';
import Workspace from '../workspace';
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

// local variable in file for testing
beforeAll(async () => {
  if (email && password && !tokenApp) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });

    if (token) {
      const workspace = new Workspace(url, token);
      const { wsCurrent, error } = await workspace.getCurrent();

      if (wsCurrent && wsCurrent?.workspace_id) {
        workspaceId = wsCurrent?.workspace_id;
      } else {
        throw Error(`Errors: ${error}`);
      }

      return tokenApp = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  } else if (tokenApp) {
    const workspace = new Workspace(url, tokenApp);
    const { wsCurrent, error } = await workspace.getCurrent();

    if (wsCurrent && wsCurrent?.workspace_id) {
      workspaceId = wsCurrent?.workspace_id;
    } else {
      throw Error(`Errors: ${error}`);
    }
  } else {
    throw Error('Need pass token or email and password parameter');
  }
});

describe('Project', () => {
  describe('#get()', () => {
    it('should get project by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const project = new Project(url, tokenApp);
      const { getApplications, error } = await project.get(workspaceId);

      if (getApplications && getApplications[0]) {
        expect(typeof getApplications[0].application_id).toBe('string');
      }
      else {
        const t = () => { throw new Error(`Error: ${error}`); };
        expect(t).toThrow(Error(`Error: ${error}`));
      }
    });
  });

  describe('#getProjectsAndDatastores()', () => {
    it('should get project and datastore by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const project = new Project(url, tokenApp);
      const { appAndDs, error } = await project.getProjectsAndDatastores(workspaceId);

      if (appAndDs && appAndDs[0] && appAndDs[0].application_id) {
        projectId = appAndDs[0].application_id;
        expect(typeof appAndDs[0].application_id).toBe('string');
        expect(typeof appAndDs[0].name).toBe('string');
        expect(typeof appAndDs[0].display_id).toBe('string');
      }
      else {
        const t = () => { throw new Error(`Error: ${error}`); };
        expect(t).toThrow(Error(`Error: ${error}`));
      }
    });
  });

  describe('#getTemplates()', () => {
    it('should get templates without error', async () => {
      jest.useFakeTimers('legacy');
      const project = new Project(url, tokenApp);
      const { getTemplates, error } = await project.getTemplates();

      if (getTemplates) {
        expect(typeof getTemplates).toBe('object');
      }
      else {
        const t = () => { throw new Error(`Error: ${error}`); };
        expect(t).toThrow(Error(`Error: ${error}`));
      }
    });
  });

  describe('#create()', () => {
    it('should create project', async () => {
      jest.useFakeTimers('legacy');
      const project = new Project(url, tokenApp);
      const createProjectParams = {
        name: {
          en: 'EN Project',
          ja: 'JA Project',
        },
      };
      const { app, error } = await project.create(createProjectParams);

      if (app) {
        expect(typeof app.project_id).toBe('string');
      } else {
        const t = () => {
          throw new Error(`Error: ${error}`);
        };
        expect(t).toThrow(Error(`Error: ${error}`));
      }
    });
  });


  describe('#getDetail()', () => {
    it('should get info project', async () => {
      jest.useFakeTimers('legacy');
      const project = new Project(url, tokenApp);
      const projectDetail = await project.getDetail(projectId);
      if (projectDetail.project) {
        expect(typeof projectDetail.project.name).toBe('string');
      } else {
        throw new Error(`Error: ${projectDetail.error}`);
      }
    });
  });

  describe('#updateProjectTheme()', () => {
    it('should update project by id project current without error', async () => {
      jest.useFakeTimers('legacy');
      const project = new Project(url, tokenApp);
      const payload: UpdateProjectThemePl = {
        payload: {
          project_id: projectId,
          theme: 'black',
        }
      };
      const { data, error } = await project.updateProjectTheme(payload);

      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#updateProjectName()', () => {
    it('should update project by id project current without error', async () => {
      jest.useFakeTimers('legacy');
      const project = new Project(url, tokenApp);
      const payload: UpdateProjectNamePl = {
        payload: {
          project_id: projectId,
          project_displayid: 'samplelogi',
          project_name: {
            en: 'test update',
            ja: 'test update',
          },
        }
      };
      const { data, error } = await project.updateProjectName(payload);

      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#delete()', () => {
    it('should delete project by id project current without error', async () => {
      jest.useFakeTimers('legacy');
      const project = new Project(url, tokenApp);
      const payload: DeleteProjectPl = {
        payload: {
          project_id: projectId,
        }
      };
      const { data, error } = await project.delete(payload);

      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

});
