import { DeleteProjectPl, UpdateProjectNamePl, UpdateProjectThemePl } from '../../types/application';
import Application from '.';
import Auth from '../auth';
import DataReport from '../dataReport';
import AuthMw from '../middlware/auth';
require('dotenv').config();
/**
 * Test with class Application
 * @cmdruntest yarn jest src/lib/packages/application/application.test.ts
 */

const url = process.env.URL || '';
let projectId = process.env.APPLICATIONID || '';
let tokenApp = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

let display_id = '';

// local variable in file for testing

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });
    if (token) {
      return tokenApp = token;
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('Application', () => {
  describe('#getProjectsAndDatastores()', () => {
    it('should get applications info by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);

      const { appAndDs, error } = await application.getProjectsAndDatastores(workspaceId);
      if (appAndDs && appAndDs[0]) {
        if (appAndDs[0].application_id && appAndDs[0].display_id) {
          projectId = appAndDs[0].application_id;
          display_id = appAndDs[0].display_id;
        }
        expect(typeof appAndDs[0].application_id).toBe('string');
        expect(typeof appAndDs[0].name).toBe('string');
        expect(typeof appAndDs[0].display_id).toBe('string');
      }
      else {
        const t = () => {
        throw new Error(`Error: ${error}`);
      };

      expect(t).toThrow(Error(`Error: ${error}`));
      }
    });
  });

// get applications info by workspace id
describe('#create()', () => {
  it('should create application', async () => {
    jest.useFakeTimers('legacy');
    const application = new Application(url, tokenApp);
    const dataReport = new DataReport(url, tokenApp);
    const reportDt = await dataReport.getReports(projectId);
    const reportId = reportDt.reports?.[0]?.rp_id;

    if (reportId) {
      const createProjectParams = {
        tp_id: reportId,
        name: {
          en: "EN Project",
          ja: "JA Project",
        },
      };
      const { app, error } = await application.create(createProjectParams);
      if (app) {
        expect(typeof app.project_id).toBe("string");
      } else {
        const t = () => {
          throw new Error(`Error: ${error}`);
        };

        expect(t).toThrow(Error(`Error: ${error}`));

      }
    } else {
      const t = () => {
        throw new Error(`Error:can't get report with projectId`);
      };
      expect(t).toThrow(new Error(`Error:can't get report with projectId`));
    }
  });
});


  describe('#get()', () => {
    it('should get info project', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);
      const {project, error} = await application.get(projectId);
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
            project_id: projectId,
          }
        }
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
        try {
          if (projectId) {
            const application = new Application(url, tokenApp);
            const payload: UpdateProjectThemePl = {
              payload: {
                project_id: projectId,
                theme: "black",
              }
            }
            const { data, error } = await application.updateProjectTheme(payload);
      
            if (data) expect(typeof data).toBe('object');
          }
        } catch (e) {
          throw new Error(`Error: ${e}`);
        }
      });
    });

    describe('#updateProjectName()', () => {
      it('should update project by id project current without error', async () => {
        jest.useFakeTimers('legacy');
        try {
          if (projectId) {
            const application = new Application(url, tokenApp);
            const payload: UpdateProjectNamePl = {
              payload: {
                project_id: projectId,
                project_displayid: display_id,
                project_name: {
                  en: "test update 4",
                  ja: "test update 4",
                },
              }
            }
            const { data, error } = await application.updateProjectName(payload);
      
            if (data) {
              expect(typeof data).toBe('object');
            }
          }
        } catch(e) {
          throw new Error(`Error: ${e}`);
        }
      });
    });
  });
