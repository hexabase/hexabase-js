
import { DtGetReports, DtReportData, GetReportsRes, ReportDataPayload, ReportDataRes } from '../../../lib/types/dataReport';
import { HxbAbstract } from '../../../HxbAbstract';
import { REPORT_DEFAULT, GET_REPORTS } from '../../graphql/dataReport';

export default class DataReport extends HxbAbstract {
  /**
   * function getReports: get reports list in project
   * @params projectId
   * @returns GetReportsRes
   */
  async getReports(projectId: string): Promise<GetReportsRes> {
    const data: GetReportsRes = {
      reports: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtGetReports = await this.client.request(GET_REPORTS, { projectId });

      data.reports = res.getReports;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }

  /**
   * function getDataReport: get data report by report id in project
   * @params projectId, reportId, reportDataPayload
   * @returns ReportDataRes
   */
  async getDataReport(projectId: string, reportId: string, reportDataPayload?: ReportDataPayload): Promise<ReportDataRes> {
    const data: ReportDataRes = {
      dataReport: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtReportData = await this.client.request(REPORT_DEFAULT, { projectId, reportId, reportDataPayload });

      data.dataReport = res.reportData;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
}
