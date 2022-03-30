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
