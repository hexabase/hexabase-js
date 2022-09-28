import DataReport from '.';
import Auth from '../auth';

require('dotenv').config();

const url = process.env.URL || '';
const projectId = process.env.APPLICATIONID || '';
let tokenApp = process.env.TOKEN || '';
const workspaceId = process.env.WORKSPACEID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

beforeAll(async () => {
  if (email && password) {
    console.log('[email, password]: ', email, password);
    const auth = new Auth(url);
    const { token, error } = await auth.login({ email, password });
    if (token) {
      return (tokenApp = token);
    } else {
      throw Error(`Need login faild to initialize sdk: ${error}`);
    }
  }
});

describe('#getReports()', () => {
  it('should get reports in project', async () => {
    jest.useFakeTimers('legacy');
    const dataReport = new DataReport(url, tokenApp);

    const { reports, error } = await dataReport.getReports(projectId);
    if (reports && reports[0]) {
      expect(typeof reports[0].rp_id).toBe('string');
    } else {
      throw new Error(`Error: ${error}`);
    }
  });
});

describe('#getDataReport()', () => {
  it('should get reports in project', async () => {
    jest.useFakeTimers('legacy');
    const newDataReport = new DataReport(url, tokenApp);
    const reportDt = await newDataReport.getReports(projectId);
    const reportId = reportDt.reports?.[0].rp_id;
    if (reportId) {
      const { dataReport, error } = await newDataReport.getDataReport(
        projectId,
        reportId
      );
      if (dataReport) {
        expect(typeof dataReport.report_title).toBe('string');
      } else {
        throw new Error(`Error: ${error}`);
      }
    } else {
      throw new Error(`Error:can't get report with projectId`);
    }
  });
});
