export interface SearchCondition {
  search_value?: any;
  data_type?: string;
  id?: string;
  rpf_id?: string;
  exact_match?: boolean;
  not_match?: boolean;
  include_null?: boolean;
  conditions?: SearchCondition;
  use_or_condition?: boolean;
}

export interface SortField {
  id?: string;
  order?: string;
}

export interface GetItemsPl {
  conditions?: SearchCondition[];
  use_or_condition?: boolean;
  unread_only?: boolean;
  sort_fields?: SortField;
  sort_field_id?: string;
  sort_order?: string;
  page: number;
  per_page: number;
  use_field_id?: boolean;
  use_display_id?: boolean;
  include_links?: boolean;
  include_lookups?: boolean;
  return_number_value?: boolean;
  format?: string;
  return_count_only?: boolean;
  omit_fields_data?: boolean;
  omit_total_items?: boolean;
  data_result_timeout_sec?: number;
  total_count_timeout_sec?: number;
  debug_query?: boolean;
}

// export interface GetItemsPl {
//   getItemsParameters: GetItemsPrs;
// }
