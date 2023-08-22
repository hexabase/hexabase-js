import { gql } from 'graphql-request';

export const GET_REPORTS = gql`
  query GetReports($projectId: String!) {
    getReports(projectId: $projectId) {
      rp_id
      title
      display_order
      hide_menu
    }
  }
`;

export const REPORT_DEFAULT = gql`
  query ReportData($reportId: String!, $projectId: String!, $reportDataPayload: ReportDataPayload) {
    reportData(reportId: $reportId, projectId: $projectId, reportDataPayload: $reportDataPayload) {
      errors {
        error_level
        error_code
        reference_id
        error
        description
      }
      error
      report_title
      totalItems
      item_index_from
      item_index_to
      merge_cells {
        colspan
        rowspan
        col
        row
      }
      report_results
      report_fields {
        title
        rpf_id
        display_type
        data_type
        display_id
        align
        width
        negative_sign_type
        num_format
        num_info {
          no_comma
          suffix
          prefix
        }
        conditions {
          font_weight
          cond_rpf_id
          condition
          cond_type
          value
          bg_color
          ft_color
          use_field_ref
          value_rpf_id
          apply_row
          font_size
          font_style
          negative_sign_type
          num_format
        }
        f_id
        d_id
        merge_cells
        hide
        disable_search
        use_integrated_report
        is_cross_key
      }
    }
  }
`;