
import { DtGetReports, DtReportData, GetReportsRes, ReportDataPayload, ReportDataRes } from '../../types/report';
import { HxbAbstract } from '../../../HxbAbstract';
import { REPORT_DEFAULT, GET_REPORTS } from '../../graphql/report';
import Project from '../project';

type ReportDataRow = {[key: string]: string | number};

export default class Report extends HxbAbstract {
  project: Project;
  id: string;
  title: string;
  displayOrder: number;
  hideMenu: boolean;
  _data: ReportDataRow[] = [];

  set(key: string, value: any): Report {
    switch (key) {
      case 'project':
        this.project = value;
        break;
      case 'rp_id':
      case 'id':
        this.id = value;
        break;
      case 'title':
        this.title = value;
        break;
      case 'display_order':
        this.displayOrder = value;
        break;
      case 'hide_menu':
        this.hideMenu = value;
        break;
		}
		return this;
	}

  /**
   * function getReports: get reports list in project
   * @params projectId
   * @returns GetReportsRes
   */
  static async all(project: Project): Promise<Report[]> {
    // handle call graphql
    const res: DtGetReports = await this.request(GET_REPORTS, { projectId: project.id });
    return res.getReports
      .map((params: {[key: string]: any}) => Report.fromJson({...{ project }, ...params }) as Report);
  }

  async data({ page = 1, perPage = 0, total = true } = {}): Promise<ReportDataRow[]> {
    if (this._data.length > 0) return this._data;

    const reportDataPayload: ReportDataPayload = {
      include_date_at: true,
      include_lookups: true,
      include_item_ref: true,
      return_number_value: true,
      page,
      per_page: perPage,
      return_utc_datetime: true,
      omit_total_items: total,
    };
    const res: DtReportData = await this.request(REPORT_DEFAULT, {
      projectId: this.project.id,
      reportId: this.id,
      reportDataPayload,
    });
    this._data = res.reportData.report_results;
    return this._data;
  }

  /**
   * function getReport: get data report by report id in project
   * @params projectId, reportId, reportDataPayload
   * @returns ReportDataRes
   */
    /*
  async getReport(projectId: string, reportId: string, reportDataPayload?: ReportDataPayload): Promise<ReportDataRes> {
    const data: ReportDataRes = {
      Report: undefined,
      error: undefined,
    };

    // handle call graphql
    try {
      const res: DtReportData = await this.request(REPORT_DEFAULT, { projectId, reportId, reportDataPayload });

      data.Report = res.reportData;
    } catch (error: any) {

      data.error = JSON.stringify(error.response.errors);
    }

    return data;
  }
    */
}
