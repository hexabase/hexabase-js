import { FieldNameENJP } from '../../util/type';

export interface DatastoreUpdateNameParams {
	name: FieldNameENJP;
	datastore_id: string;
	display_id?: string;
}
export interface DatastoreUpdateName {
	payload: DatastoreUpdateNameParams;
}
