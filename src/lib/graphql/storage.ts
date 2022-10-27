import { gql } from 'graphql-request';

export const GET_DOWNLOAD_FILE = gql`
	query GetDownloadFile($id: String!) {
		getDownloadFile(id: $id){
			filename
			data
		}
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


export const FILE_ATTACHMENT = gql`
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