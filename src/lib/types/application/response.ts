import { GenericAPIError } from '../../util/type/response';
import { CreateProgram } from 'typescript';
import { Datastore } from '../datastore';

export interface ApplicationAndDataStore {
  application_id?: string;
  name?: string;
  display_id?: string;
  datastores?: [Datastore];
}

export interface CreateApp {
  project_id: string;
}

export interface ReportListItem {
  rp_id?: string;
  title?: string;
  display_order?: number;
  hide_menu?: boolean;
}

export interface MergeCells {
  row?: number;
  col?: number;
  rowspan?: number;
  colspan?: number;
}

export interface NumInfoReportFields {
  prefix: string;
  suffix: string;
  no_comma: boolean;
}

export interface ConditionsReportFields {
  cond_rpf_id: string;
  condition: string;
  cond_type: string;
  value: any;
  bg_color: string;
  ft_color: string;
  apply_row: boolean;
  use_field_ref: boolean;
  value_rpf_id: string;
  font_size: string;
  font_style: string;
  font_weight: string;
  negative_sign_type: string;
  num_format: string;
}

export interface ReportUIField {
  title: string;
  rpf_id: string;
  display_id: string;
  data_type: string;
  display_type: string;
  align: string;
  width: number;
  negative_sign_type: string;
  num_format: string;
  num_info: NumInfoReportFields;
  conditions: ConditionsReportFields[];
  f_id: string;
  d_id: string;
  merge_cells: boolean;
  hide: boolean;
  disable_search: boolean;
  use_integrated_report: boolean;
  is_cross_key: boolean;
}

export interface ReportDefaultData {
  error?: [GenericAPIError];
  report_title?: string;
  totalItems?: number;
  item_index_from?: number;
  item_index_to?: number;
  merge_cells?: [MergeCells];
  report_results?: any;
  report_fields: ReportUIField[];
}

/** Data response from request graphql */

export interface DtAppAndDs {
  getApplicationAndDataStore: [ApplicationAndDataStore];
}

export interface DtCreateApp {
  applicationCreateProject: CreateApp;
}

export interface DtGetReports {
  getReports: [ReportListItem];
}
export interface DtReportData {
  reportData: ReportDefaultData;
}

/** Response */
export interface AppAndDsRes {
  appAndDs?: [ApplicationAndDataStore];
  error?: string;
}

export interface CreateAppRes {
  app?: CreateApp;
  error?: string;
}

export interface GetReportsRes {
  reports?: [ReportListItem];
  error?: string;
}

export interface ReportDataRes {
  dataReport?: ReportDefaultData;
  error?: string;
}
