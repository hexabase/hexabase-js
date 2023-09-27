import { SearchCondition, SortField } from '../item';
export interface SearchParameter {
    project_id?: string;
    datastore_id?: string;
    conditions?: SearchCondition[];
    use_or_condition?: boolean;
    unread_only?: Boolean;
    sort_fields?: SortField[];
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
    include_fields_data?: boolean;
    omit_fields_data?: boolean;
    omit_total_items?: boolean;
    data_result_timeout_sec?: number;
    total_count_timeout_sec?: number;
    debug_query?: boolean;
    select_fields?: string[];
    select_fields_lookup?: any;
}
export type PostgrestError = {
    message: string;
    details: string;
    hint: string;
    code: string;
};
interface PostgrestResponseBase {
    status: number;
    statusText: string;
}
export interface PostgrestResponseSuccess<T> extends PostgrestResponseBase {
    error: null;
    data: T;
    count: number | null;
}
export interface PostgrestResponseFailure extends PostgrestResponseBase {
    error: PostgrestError;
    data: null;
    count: null;
}
export type PostgrestSingleResponse<T> = PostgrestResponseSuccess<T> | PostgrestResponseFailure;
export type PostgrestMaybeSingleResponse<T> = PostgrestSingleResponse<T | null>;
export type PostgrestResponse<T> = PostgrestSingleResponse<T[]>;
export {};
