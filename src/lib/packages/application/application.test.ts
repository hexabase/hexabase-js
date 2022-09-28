import { DeleteProjectPl, UpdateProjectNamePl, UpdateProjectThemePl } from '../../types/application';
import Application from '.';
import Auth from '../auth';
import AuthMw from '../middlware/auth';
require('dotenv').config();
/**
 * Test with class Application
 * @cmdruntest yarn jest src/lib/packages/application/application.test.ts
 */

const url = process.env.URL || '';
// const projectId = process.env.APPLICATIONID || '';
let tokenApp = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';
const template = process.env.PROJECT_TEMPLATE || '';

let newApplicationId: any = '';

// local variable in file for testing

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });
    if (token) {
      const application = new Application(url, token);
      const projectAndDs = await application.getProjectsAndDatastores(workspaceId);
      if (projectAndDs && projectAndDs.appAndDs && projectAndDs.appAndDs.length > 0) {
        newApplicationId = projectAndDs.appAndDs[0].application_id;
      }
      return tokenApp = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

// get applications info by workspace id
describe('Application', () => {
  describe('#create()', () => {
    it('should create application', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);
      const createProjectParams = {
        tp_id: template,
        name: {
          en: 'EN Project',
          ja: 'JA Project',
        }
      };
      const { app, error } = await application.create(createProjectParams);
      if (app) {

        expect(typeof app.project_id).toBe('string');
      }
      else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#get()', () => {
    it('should get info project', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);
      const { project, error } = await application.get(newApplicationId);
      if (project) {
        expect(typeof project.name).toBe('string');
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
          project_id: '63315fb4c32cd43154ffee0d',
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

  describe('#updateProjectTheme()', () => {
    it('should update project by id project current without error', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);
      const payload: UpdateProjectThemePl = {
        payload: {
          project_id: '633166e015ff31c3b77ec150',
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
          project_id: '633166e015ff31c3b77ec150',
          project_displayid: 'samplelogin4',
          project_name: {
            en: 'test update 4',
            ja: 'test update 4',
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

});
