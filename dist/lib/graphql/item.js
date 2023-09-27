"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_ITEMS = exports.ITEM_WITH_SEARCH = exports.POST_DELETE_ITEM_HISTORY = exports.POST_UPDATE_ITEM_HISTORY = exports.POST_NEW_ITEM_HISTORY = exports.EXECUTE_ITEM_ACTION = exports.UPDATE_ITEM = exports.ITEM_DETAIL = exports.DELETE_ITEM_LINK = exports.UPDATE_ITEM_LINK = exports.ADD_ITEM_LINK = exports.ITEM_LINKED = exports.DATASTORE_UPDATE_ITEM = exports.DELETE_ITEM = exports.CREATE_NEW_ITEM = exports.CREATE_ITEMID = exports.ITEM_HISTORIES = exports.DS_ITEMS = void 0;
const graphql_request_1 = require("graphql-request");
exports.DS_ITEMS = (0, graphql_request_1.gql) `
  mutation DatastoreGetDatastoreItems(
    $getItemsParameters: GetItemsParameters!
    $datastoreId: String!
    $projectId: String
  ) {
    datastoreGetDatastoreItems(
      getItemsParameters: $getItemsParameters
      datastoreId: $datastoreId
      projectId: $projectId
    ) {
      items
      totalItems
    }
  }
`;
exports.ITEM_HISTORIES = (0, graphql_request_1.gql) `
  query GetHistories(
    $itemId: String!
    $datastoreId: String!
    $projectId: String!
    $getHistoryParamQueries: GetHistoryParamQueries
  ) {
    getHistories(
      itemId: $itemId
      datastoreId: $datastoreId
      projectId: $projectId
      getHistoryParamQueries: $getHistoryParamQueries
    ) {
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
exports.CREATE_ITEMID = (0, graphql_request_1.gql) `
  mutation DatastoreCreateItemID($datastoreId: String!) {
    datastoreCreateItemID(datastoreId: $datastoreId) {
      item_id
    }
  }
`;
exports.CREATE_NEW_ITEM = (0, graphql_request_1.gql) `
  mutation DatastoreCreateNewItem(
    $payload: NewItemActionParameters!
    $datastoreId: String!
    $projectId: String!
  ) {
    datastoreCreateNewItem(
      newItemActionParameters: $payload
      datastoreId: $datastoreId
      projectId: $projectId
    ) {
      error
      history_id
      item
      item_id
    }
  }
`;
exports.DELETE_ITEM = (0, graphql_request_1.gql) `
  mutation DatastoreDeleteItem(
    $deleteItemReq: DeleteItemReq!
    $itemId: String!
    $datastoreId: String!
    $projectId: String!
  ) {
    datastoreDeleteItem(
      deleteItemReq: $deleteItemReq
      itemId: $itemId
      datastoreId: $datastoreId
      projectId: $projectId
    ) {
      error
    }
  }
`;
exports.DATASTORE_UPDATE_ITEM = (0, graphql_request_1.gql) `
  mutation DatastoreUpdateItem(
    $itemActionParameters: ItemActionParameters!
    $itemId: String!
    $datastoreId: String!
    $projectId: String!
  ) {
    datastoreUpdateItem(
      ItemActionParameters: $itemActionParameters
      itemId: $itemId
      datastoreId: $datastoreId
      projectId: $projectId
    )
  }
`;
exports.ITEM_LINKED = (0, graphql_request_1.gql) `
  query DatastoreGetLinkedItems(
    $linkedDatastoreId: String!
    $itemId: String!
    $datastoreId: String!
  ) {
    datastoreGetLinkedItems(
      linkedDatastoreId: $linkedDatastoreId
      itemId: $itemId
      datastoreId: $datastoreId
    ) {
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
`;
exports.ADD_ITEM_LINK = (0, graphql_request_1.gql) `
  mutation AddItemLink(
    $datastoreId: String!
    $itemId: String!
    $itemLinkRequestInput: ItemLinkRequestInput!
    $projectId: String!
  ) {
    addItemLink(
      datastoreId: $datastoreId
      itemId: $itemId
      itemLinkRequestInput: $itemLinkRequestInput
      projectId: $projectId
    ) {
      data
      success
    }
  }
`;
exports.UPDATE_ITEM_LINK = (0, graphql_request_1.gql) `
  mutation UpdateItemLink(
    $datastoreId: String!
    $itemId: String!
    $projectId: String!
    $updateItemLinkInput: UpdateItemLinkInput!
  ) {
    updateItemLink(
      datastoreId: $datastoreId
      itemId: $itemId
      projectId: $projectId
      updateItemLinkInput: $updateItemLinkInput
    ) {
      data
      success
    }
  }
`;
exports.DELETE_ITEM_LINK = (0, graphql_request_1.gql) `
  mutation DeleteItemLink(
    $datastoreId: String!
    $itemId: String!
    $itemLinkRequestInput: ItemLinkRequestInput!
    $projectId: String!
  ) {
    deleteItemLink(
      datastoreId: $datastoreId
      itemId: $itemId
      itemLinkRequestInput: $itemLinkRequestInput
      projectId: $projectId
    ) {
      data
      success
    }
  }
`;
exports.ITEM_DETAIL = (0, graphql_request_1.gql) `
  query GetDatastoreItemDetails(
    $itemId: String!
    $datastoreId: String!
    $projectId: String
    $datastoreItemDetailParams: DatastoreItemDetailParams
  ) {
    getDatastoreItemDetails(
      itemId: $itemId
      datastoreId: $datastoreId
      projectId: $projectId
      datastoreItemDetailParams: $datastoreItemDetailParams
    ) {
      title
      rev_no
      field_values
      status_list
      item_actions
      status_actions
      status_order
      status_action_order
      item_action_order
    }
  }
`;
exports.UPDATE_ITEM = (0, graphql_request_1.gql) `
  mutation DatastoreUpdateItem(
    $itemUpdatePayload: ItemUpdatePayload!
    $itemId: String!
    $datastoreId: String!
    $projectId: String!
  ) {
    datastoreUpdateItem(
      itemUpdatePayload: $itemUpdatePayload
      itemId: $itemId
      datastoreId: $datastoreId
      projectId: $projectId
    )
  }
`;
exports.EXECUTE_ITEM_ACTION = (0, graphql_request_1.gql) `
  mutation DatastoreExecuteItemAction(
    $projectId: String!
    $datastoreId: String!
    $actionId: String!
    $itemId: String!
    $itemActionParameters: ItemActionParameters!
  ) {
    datastoreExecuteItemAction(
      projectId: $projectId
      datastoreId: $datastoreId
      actionId: $actionId
      itemId: $itemId
      itemActionParameters: $itemActionParameters
    ) {
      item_id
      item
      error
    }
  }
`;
exports.POST_NEW_ITEM_HISTORY = (0, graphql_request_1.gql) `
  mutation PostNewItemHistory($payload: CreateCommentItemsParameters!) {
    postNewItemHistory(payload: $payload) {
      history_id
      item_history {
        IsChanged
        UserObjID
        action_id
        comment
        created_at
        datastore_id
        datastore_name
        display_order
        email
        history_id
        i_id
        is_fetchreplymail
        is_notify
        item_id
        media_link
        post_for_rel
        post_mode
        project_id
        transaction_id
        updated_at
        user_id
        username
        workspace_id
      }
    }
  }
`;
exports.POST_UPDATE_ITEM_HISTORY = (0, graphql_request_1.gql) `
  mutation PostUpdateItemHistory($payload: UpdateCommentItemsParameters!) {
    postUpdateItemHistory(payload: $payload) {
      error
    }
  }
`;
exports.POST_DELETE_ITEM_HISTORY = (0, graphql_request_1.gql) `
  mutation ArchiveItemHistory($payload: ArchiveCommentItemsParameters!) {
    archiveItemHistory(payload: $payload) {
      error
    }
  }
`;
exports.ITEM_WITH_SEARCH = (0, graphql_request_1.gql) `
  mutation ItemWithSearch($payload: GetItemsParameters!) {
    itemWithSearch(getItemsParameters: $payload) {
      fields
      items
      errors {
        reference_id
        error_level
        error_code
        error
        description
      }
      totalItems
    }
  }
`;
exports.DELETE_ITEMS = (0, graphql_request_1.gql) `
  mutation DatastoreDeleteDatastoreItems($datastoreId: String!, $projectId: String, $payload: DeleteItemsParameters) {
    datastoreDeleteDatastoreItems(datastoreId: $datastoreId, projectId: $projectId, deleteItemsParameters: $payload) {
      data
      success
    }
  }
`;
//# sourceMappingURL=item.js.map