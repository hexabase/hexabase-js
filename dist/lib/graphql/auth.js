"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGIN = void 0;
const graphql_request_1 = require("graphql-request");
exports.LOGIN = (0, graphql_request_1.gql) `
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
    }
  }
`;
//# sourceMappingURL=auth.js.map