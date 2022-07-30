import Application from '.';
import Auth from '../auth';
import AuthMw from '../middlware/auth';
require('dotenv').config();
/**
 * Test with class Application
 * @cmdruntest yarn jest src/lib/packages/application/application.test.ts
 */

const url = process.env.URL || '';
const projectId = process.env.APPLICATIONID || '';
let tokenApp = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

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

// get applications info by workspace id
describe('Application', () => {
  describe('#getProjectsAndDatastores()', () => {
    it('should get applications info by workspace id', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);

      const { appAndDs, error } = await application.getProjectsAndDatastores(workspaceId);
      if (appAndDs) {

        expect(typeof appAndDs[0].application_id).toBe('string');
        expect(typeof appAndDs[0].name).toBe('string');
        expect(typeof appAndDs[0].display_id).toBe('string');
      }
      else {
        throw new Error(`Error: ${error}`);
      }
    });
  });


  describe('#create()', () => {
    it('should create application', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);
      const reportDt = await application.getReports(projectId);
      const reportId = reportDt.reports?.[0].rp_id;

      if (reportId) {
        const createProjectParams = {
          tp_id: reportId,
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
      } else {
        throw new Error(`Error:can't get report with projectId`);

      }
    });
  });


  describe('#getReports()', () => {
    it('should get reports in project', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);

      const { reports, error } = await application.getReports(projectId);
      if (reports && reports[0]) {
        expect(typeof reports[0].rp_id).toBe('string');
      }
      else {
        throw new Error(`Error: ${error}`);
      }
    });
  });

  describe('#getDataReport()', () => {
    it('should get reports in project', async () => {
      jest.useFakeTimers('legacy');
      const application = new Application(url, tokenApp);
      const reportDt = await application.getReports(projectId);
      const reportId = reportDt.reports?.[0].rp_id;
      if (reportId) {
        const { dataReport, error } = await application.getDataReport(projectId, reportId);
        if (dataReport) {
          expect(typeof dataReport.report_title).toBe('string');
        } else {
          throw new Error(`Error: ${error}`); }
      } else {
        throw new Error(`Error:can't get report with projectId`);
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
});
