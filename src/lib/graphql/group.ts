import { gql } from 'graphql-request';

export const ADD_GROUP_TREE = gql`
mutation addGroupTree($payload: AddGroupReq!) {
  addGroupTree(payload: $payload) {
    error
    groupTree_datastores_res
    group {
      id
      g_id
      display_id
      name
      index
      disable_ui_access
      is_root
      access_key
      created_at
    }
  }
}
`;

export const UPDATE_GROUP = gql`
query updateGroup(
	$payload: UpdateGroupReq!
	$groupId: String!
	) {
		updateGroup(
			payload: $payload
			groupId: $groupId
		) {
			error
			group {
				g_id
				group_id
				name
				index
			}
			children {
				g_id
				group_id
				name
				index
			}
			count
		}
	}
`;

export const GET_USERS_IN_GROUP = gql`
query getUsersInGroup($groupId: String!) {
	getUsersInGroup(groupId: $groupId) {
		count
		members {
			u_id
			username
			email
			profile_pic
			confirmed
			email_sent
			is_sv
			user_roles {
				r_id
				role_name
				role_id
				p_id
				application_id
				application_name
				application_display_order
			}
			additional_info
		}
	}
}
`;

export const DELETE_GROUP = gql`
query deleteGroup($groupId: String!) {
	deleteGroup(groupId: $groupId) {
		error
	}
}
`;

export const ADD_USER_IN_GROUP = gql`
mutation addUserInGroup($payload: AddUserPayload!) {
	addUserInGroup(payload: $payload) {
		added
		exists
		user_profile {
			confirmed
			email
			email_sent
			profile_pics {
				mediaLink
			}
			u_id
			user_code
			username
		}
	}
}
`;

export const REMOVE_USER_FROM_GROUP = gql`
mutation removeUserFromGroup($payload: removeUserFromGroupPayload!) {
	removeUserFromGroup(payload: $payload) {
		error
	}
}
`;