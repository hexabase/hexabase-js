
import { DtGetReports, DtReportData, GetReportDataResponse, GetReportsRes, ItemIdDatastoreId, ReportDataPayload, ReportDataRes, ReportDataRow } from './type';
import { HxbAbstract } from '../../../HxbAbstract';
import { REPORT_DEFAULT, GET_REPORTS } from './graphql';
import Project from '../project';
import Item from '../item';


export default class Report extends HxbAbstract {
  project: Project;
  id: string;
  title: string;
  displayOrder: number;
  hideMenu: boolean;
  _data: GetReportDataResponse[] = [];

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

  async data({ page = 1, perPage = 0, total = true } = {}): Promise<GetReportDataResponse[]> {
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
    res.reportData.report_fields;
    await this.project.datastores();
    this._data = res.reportData.report_results.map((row: ReportDataRow) => {
      const params: GetReportDataResponse = {
        createdAt: new Date(row.created_at! as string),
        updatedAt: new Date(row.updated_at! as string),
        items: (row.items as ItemIdDatastoreId[]).map((params) => {
          const database = this.project.datastoreSync(params.d_id);
          const item = new Item({i_id: params.i_id});
          item.datastore = database;
          return item;
        })
      };
      for (const key in row) {
        if (['created_at', 'updated_at', 'items'].includes(key)) continue;
        const fieldName = res.reportData.report_fields.find((field: any) => field.rpf_id === key)?.title;
        if (!fieldName) continue;
        params[fieldName] = row[key];
      }
      return params;
    });
    return this._data;
  }
}
