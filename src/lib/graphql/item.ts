import { gql } from 'graphql-request';

export const DS_ITEMS = gql`
  mutation ApplicationCreateProject($getItemsParameters: GetItemsParameters!, $datastoreId: String!, $projectId: String) {
    datastoreGetDatastoreItems(getItemsParameters: $getItemsParameters, datastoreId: $datastoreId, projectId: $projectId) {
      items
      totalItems
    }
  }
`;
