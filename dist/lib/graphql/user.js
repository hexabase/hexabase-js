"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST_INVITE_USERS = exports.LOG_OUT = exports.USER_CONFIRMATIONS = exports.USER_PASSWORD_EXPIRY = exports.USER_REGISTER_CONFIRM = exports.USER_REGISTER = exports.USER_INFO = void 0;
const graphql_request_1 = require("graphql-request");
exports.USER_INFO = (0, graphql_request_1.gql) `
  query UserInfo {
    userInfo {
      username
      email
      profile_pic
      u_id
      current_workspace_id
      is_ws_admin
      user_roles {
        r_id
        role_name
        role_id
        p_id
        application_id
        application_name
        application_display_order
      }
    }
  }
`;
exports.USER_REGISTER = (0, graphql_request_1.gql) `
  query UserRegister($confirmationId: String!) {
    userRegister(confirmationId: $confirmationId) {
      user {
        username
        isElapsed
        id
        email_confirmed
        email
        confirmed
        confirmation_id
      }
    }
  }
`;
exports.USER_REGISTER_CONFIRM = (0, graphql_request_1.gql) `
  mutation UserRegisterConfirm($confirmRegisterUserInput: ConfirmRegisterUser!) {
    userRegisterConfirm(confirmRegisterUserInput: $confirmRegisterUserInput) {
      token
    }
  }
`;
exports.USER_PASSWORD_EXPIRY = (0, graphql_request_1.gql) `
  query UserPasswordExpiry {
    userPasswordExpiry {
      is_expired
    }
  }
`;
exports.USER_CONFIRMATIONS = (0, graphql_request_1.gql) `
  query UserConfirmations($confirmationId: String!) {
    userConfirmations(confirmationId: $confirmationId) {
      user {
        confirmation_id
        confirmed
        current_workspace_id
        email
        tmp_email
        email_confirmed
        id
        isElapsed
        username
        workspace {
          is_root
          name
          index
          id
          g_id
          display_id
          disable_ui_access
          created_at
          access_key
        }
      }
    }
  }
`;
exports.LOG_OUT = (0, graphql_request_1.gql) `
  mutation Logout {
    logout {
      data
      success
    }
  }
`;
exports.POST_INVITE_USERS = (0, graphql_request_1.gql) `
  mutation PostInviteUsers($payload: PostInviteUsersPl!) {
    postInviteUsers(payload: $payload) {
      email
      stats
    }
  }
`;
//# sourceMappingURL=user.js.map