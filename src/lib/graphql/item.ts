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