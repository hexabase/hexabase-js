import { GenericAPIError } from "../../../../src/lib/util/type";
import { MergeCells, ReportUIField } from "../application";

export interface ReportListItem {
  rp_id?: string;
  title?: string;
  display_order?: number;
  hide_menu?: boolean;
}

export interface ReportDefaultData {
    errors?: [GenericAPIError];
    error?: string;
    report_title?: string;
    totalItems?: number;
    item_index_from?: number;
    item_index_to?: number;
    merge_cells?: [MergeCells];
    report_results?: any;
    report_fields: ReportUIField[];
  }

export interface DtGetReports {
  getReports: [ReportListItem];
}
export interface DtReportData {
  reportData: ReportDefaultData;
}

export interface GetReportsRes {
    reports?: [ReportListItem];
    error?: string;
  }
  
  export interface ReportDataRes {
    dataReport?: ReportDefaultData;
    error?: string;
  }