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
