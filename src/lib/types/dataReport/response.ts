import { GenericAPIError } from '../../../../src/lib/util/type';

export interface ReportListItem {
  rp_id?: string;
  title?: string;
  display_order?: number;
  hide_menu?: boolean;
}

export interface NumInfoReportFields {
    prefix: string;
    suffix: string;
    no_comma: boolean;
  }

export interface GetReportsRes {
  reports?: [ReportListItem];
  error?: string;
}

export interface MergeCells {
  row?: number;
  col?: number;
  rowspan?: number;
  colspan?: number;
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

export interface ReportDataRes {
  dataReport?: ReportDefaultData;
  error?: string;
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
