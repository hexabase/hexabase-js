import { gql } from 'graphql-request';

export const DATASTORE_CREATE_FIELD = gql`
mutation datastoreCreateField($payload: CreateFieldPayload!, $datastoreId: String!) {
	datastoreCreateField(payload: $payload, datastoreId: $datastoreId) {
		display_id
		field_id
	}
}
`;
