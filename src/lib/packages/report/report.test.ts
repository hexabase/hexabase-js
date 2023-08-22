import DataReport from '.';
import Auth from '../auth';
import HexabaseClient from '../../../HexabaseClient';
require('dotenv').config();

const url = process.env.URL || '';
const token = process.env.TOKEN || '';
const workspaceId = process.env.DEV_WORKSPACE_ID || '';
const projectId = process.env.DEV_PROJECT_ID || '';
const email = process.env.EMAIL || '';
const password = process.env.PASSWORD || '';

const client = new HexabaseClient('dev');

beforeAll(async () => {
  await client.login({ email, password, token });
  await client.setWorkspace(workspaceId);
});

describe('#getReports()', () => {
  it('should get reports in project', async () => {
    jest.useFakeTimers('legacy');
    const project = await client.currentWorkspace!.project(projectId);
    const reports = await project!.reports();
    expect(typeof reports[0].id).toBe('string');
  });
});

describe('#getReportData()', () => {
  it('should get reports in project', async () => {
    const project = await client.currentWorkspace!.project(projectId);
    const reports = await project!.reports();
    const report = reports[0];
    const data = await report.data();
    console.log(data);
    expect(data.length > 0).toBe(true);
    expect(typeof data[0].i_id).toBe('string');
  });
});
