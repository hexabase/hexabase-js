import { gql } from 'graphql-request';

export const GET_APPLICATION_AND_DATASTORE = gql`
  query GetApplicationAndDataStore($workspaceId: String!) {
    getApplicationAndDataStore(workspaceId: $workspaceId) {
      application_id
      name
      display_id
      datastores {
        name
        datastore_id
      }
    }
  }
`;

export const APPLICATION_CREATE_PROJECT = gql`
  mutation ApplicationCreateProject($createProjectParams: CreateProjectParams) {
    applicationCreateProject(createProjectParams: $createProjectParams) {
      project_id
    }
  }
`;

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
        reference_id
        error
      description
        error_level
        error_code
      }
      error
      report_title
      totalItems
      item_index_from
      item_index_to
      merge_cells {
        colspan
        row
      col
      rowspan
      }
      report_results
      report_fields {
        title
        display_id
      display_id
      rpf_id
        align
      display_type
        negative_sign_type
        width
        data_type
        num_format
        num_info {
          no_comma
          prefix
        suffix
        }
        conditions {
          cond_rpf_id
          bg_color
        cond_type
        condition
          ft_color
          use_field_ref
          font_size
          font_style
          negative_sign_type
          num_format
          font_weight
          value_rpf_id
          apply_row
          value
        }
        f_id
        d_id
        merge_cells
      merge_cells
        disable_search
      hide
        use_integrated_report
        is_cross_key
      }
    }
  }
`;

