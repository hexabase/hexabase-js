export interface History2 {
    user_id: string;
    history_id: string;
    item_id: string;
    transaction_id: string;
    comment: string;
    datastore_id: string;
    workspace_id: string;
    action_id: string;
    action_name: string;
    post_mode: string;
    created_at: Date;
    username: string;
    email: string;
    datastore_name: string;
    media_link: string;
    display_order: number;
}

export interface History {
    h_id: string;
    user_id: string;
    i_id: string;
    history: History2;
}

export interface ItemHistories {
    histories: History[];
    unread: number;
}