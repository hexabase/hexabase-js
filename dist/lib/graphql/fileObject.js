"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_ATTACHMENT = exports.DELETE_STORAGE = exports.GET_DOWNLOAD_FILE = void 0;
const graphql_request_1 = require("graphql-request");
exports.GET_DOWNLOAD_FILE = (0, graphql_request_1.gql) `
  query GetDownloadFile($id: String!) {
    getDownloadFile(id: $id){
      filename
      data
    }
  }
`;
exports.DELETE_STORAGE = (0, graphql_request_1.gql) `
  mutation DeleteStorage($fileId: String!) {
    deleteStorage(fileId: $fileId) {
      data
      success
    }
  }
`;
exports.FILE_ATTACHMENT = (0, graphql_request_1.gql) `
  mutation CreateItemFileAttachment($payload: ItemFileAttachmentPl!) {
    createItemFileAttachment(payload: $payload) {
      _id
      created_at
      d_id
      contentType
      datastore_id
      deleted
      field_id
      display_order
      file_id
      filename
      filepath
      name
      item_id
      i_id
      mediaLink
      p_id
      timeCreated
      size
      selfLink
      temporary
      updated
      w_id
      user_id
    }
  }
`;
//# sourceMappingURL=fileObject.js.map