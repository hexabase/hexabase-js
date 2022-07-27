import { gql } from 'graphql-request';

export const USER_INFO = gql`
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

export const USER_REGISTER = gql`
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

export const USER_PASSWORD_EXPIRY = gql`
  query UserPasswordExpiry {
    userPasswordExpiry {
      is_expired
    }
  }
`;

export const USER_CONFIRMATIONS = gql`
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


export const LOG_OUT = gql`
  mutation Logout {
    logout {
      data
      success
    }
  }
`;