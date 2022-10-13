import { DeleteProjectPl, UpdateProjectNamePl, UpdateProjectThemePl } from '../../types/application';
import Application from '.';
import Auth from '../auth';
import Workspace from '../workspace';
require('dotenv').config();
/**
 * Test with class Application
 * @cmdruntest yarn jest src/lib/packages/application/application.test.ts
 */

let projectId = process.env.APPLICATIONID || '';
let tokenApp = process.env.TOKEN || '';
let workspaceId = process.env.WORKSPACEID || '';
const url = process.env.URL || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const templateId = process.env.PROJECT_TEMPLATE_ID || '';

// local variable in file for testing

const createWorkSpaceInput = {
  name: 'new Workspace'
};

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });

    if (token) {
      const workspace = new Workspace(url, token);
      const { workspaces } = await workspace.get();

      if (workspaces && workspaces?.workspaces && workspaces?.workspaces[0]?.workspace_id) {
        workspaceId = workspaces?.workspaces[0]?.workspace_id;
      } else {
        const workspace = new Workspace(url, token);
        const { w_id } = await workspace.create(createWorkSpaceInput);

        if (w_id) {
          workspaceId = w_id;
        }
      }
      return tokenApp = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Application', () => {
  describe('#get()', () => {
    it('should get applications by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);
      const { getApplications, error } = await application.get(workspaceId);

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
    it('should get applications and datastore by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);
      const { appAndDs, error } = await application.getProjectsAndDatastores(workspaceId);

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

  describe('#create()', () => {
    it('should create application', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);
      const createProjectParams = {
        name: {
          en: 'EN Project',
          ja: 'JA Project',
        },
      };
      const { app, error } = await application.create(createProjectParams);

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
      const application = new Application(url, tokenApp);
      const { project, error } = await application.getDetail(projectId);
      if (project) {
        expect(typeof project.name).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#updateProjectTheme()', () => {
    it('should update project by id project current without error', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);
      const payload: UpdateProjectThemePl = {
        payload: {
          project_id: projectId,
          theme: 'black',
        }
      };
      const { data, error } = await application.updateProjectTheme(payload);

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
      const application = new Application(url, tokenApp);
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
      const { data, error } = await application.updateProjectName(payload);

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
      const application = new Application(url, tokenApp);
      const payload: DeleteProjectPl = {
        payload: {
          project_id: projectId,
        }
      };
      const { data, error } = await application.delete(payload);

      if (data) {
        expect(typeof data).toBe('object');
      } else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

});
