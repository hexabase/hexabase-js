import { gql } from 'graphql-request';

export const DELETE_STORAGE = gql`
  mutation DeleteStorage(
    $fileId: String!
  ) {
    deleteStorage(
      fileId: $fileId
    ) {
			success
			data
    }
  }
`;
