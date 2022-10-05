import { FieldNameENJP } from '../../util/type';

export interface CreateProjectPl {
  tp_id?: string;
  name: FieldNameENJP;
}

export interface ReportDataPayload {
  per_page?: number;
  page?: number;
  include_date_at?: boolean;
  include_lookups?: boolean;
  include_item_ref?: boolean;
  return_number_value?: boolean;
  return_id_value_results?: boolean;
  return_count_only?: boolean;
  return_utc_datetime?: Date;
  omit_total_items?: boolean;
  total_count_timeout_sec?: number;
  data_result_timeout_sec?: number;
  debug_query?: boolean;
}

export interface DeleteParamsProject {
  project_id: string;
}

export interface UpdateProjectThemeParamsProject {
  project_id: string;
  theme: 'blue' | 'white' | 'gray' | 'black';
}

export interface ProjectName {
  en: string;
  ja: string;
}

export interface UpdateProjectNameParamsProject {
  project_id: string;
  project_name: ProjectName;
  project_displayid?: string;
  theme?: 'blue' | 'white' | 'gray' | 'black';
}

export interface DeleteProjectPl {
  payload: DeleteParamsProject;
}

export interface UpdateProjectThemePl {
  payload: UpdateProjectThemeParamsProject;
}

export interface UpdateProjectNamePl {
  payload: UpdateProjectNameParamsProject;
}