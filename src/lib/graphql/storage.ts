import { gql } from 'graphql-request';

export const GET_DOWNLOAD_FILE = gql`
	query GetDownloadFile($getDownloadFileId: String!) {
		getDownloadFile(id: $getDownloadFileId)
  }
`;


export const DELETE_STORAGE = gql`
	mutation DeleteStorage($fileId: String!) {
		deleteStorage(fileId: $fileId) {
			data
			success
		}
	}
`;