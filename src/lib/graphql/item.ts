import { gql } from 'graphql-request';

export const DS_ITEMS = gql`
  mutation ApplicationCreateProject($getItemsParameters: GetItemsParameters!, $datastoreId: String!, $projectId: String) {
    datastoreGetDatastoreItems(getItemsParameters: $getItemsParameters, datastoreId: $datastoreId, projectId: $projectId) {
      items
      totalItems
    }
  }
`;

export const ITEM_HISTORIES = gql`
  query GetHistories($itemId: String!, $datastoreId: String!, $projectId: String!, $getHistoryParamQueries: GetHistoryParamQueries) {
    getHistories(itemId: $itemId, datastoreId: $datastoreId, projectId: $projectId, getHistoryParamQueries: $getHistoryParamQueries) {
      unread
      histories {
        history_id
        display_order
        comment
        is_unread
        created_at
        action_id
        action_name
        transaction_id
        action_operation
        is_status_action
        datastore_id
        datastore_name
        user_id
        username
        email
        updated_by
        updated_at
        media_link
        is_updated
      }
    }
  }
`;

export const CREATE_ITEMID = gql`
  mutation DatastoreCreateItemID($datastoreId: String!) {
    datastoreCreateItemID(datastoreId: $datastoreId) {
      item_id
    }
  }
`;

export const CREATE_NEW_ITEM = gql`
  mutation DatastoreCreateNewItem($newItemActionParameters: NewItemActionParameters!, $datastoreId: String!, $projectId: String!) {
    datastoreCreateNewItem(newItemActionParameters: $newItemActionParameters, datastoreId: $datastoreId, projectId: $projectId) {
      error
      history_id
      item
      item_id
    }
  }
`;

export const ITEM_LINKED = gql`
  query DatastoreGetLinkedItems($linkedDatastoreId: String!, $itemId: String!, $datastoreId: String!) {
    datastoreGetLinkedItems(linkedDatastoreId: $linkedDatastoreId, itemId: $itemId, datastoreId: $datastoreId) {
      items
      datastore_id
      actions {
        ID
        a_id
        display_id
        w_id
        p_id
        d_id
        name
        status_id
        is_status_action
        description
        display_order
        pin_by_default
        show_in_home
        search_keys
        operation
        set_status
        send_mail
        isOwnedBySystem
        AccessKeys
        action_script {
          script
          enabled
          lang
        }
        CreatedAt
        UpdatedAt
      }
      stateflowActions {
        ID
        a_id
        w_id
        display_id
        p_id
        d_id
        name
        status_id
        is_status_action
        description
        show_in_home
        display_order
        pin_by_default
        search_keys
        operation
        set_status
        send_mail
        isOwnedBySystem
        AccessKeys
        action_script {
          script
          enabled
          lang
        }
        CreatedAt
        UpdatedAt
      }
      fields {
        id
        f_id
        w_id
        p_id
        d_id
        field_csv_name
        display_name
        name {
          ja
          en
        }
        display_id
        dataType
        search
        show_list
        as_title
        status
        fieldIndex
        title_order
        full_text
        unique
        min_value
        max_value
        hideOnInput
        hide_from_api
        has_index
      }
      column_settings
    }
  }
`