import { FieldNameENJP } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
import Datastore from '../datastore';
import UserRole from '../userRole';

export default class Action extends HxbAbstract {
	datastore: Datastore;
	id: string;
	displayId: string;
	name: string | FieldNameENJP;
	isStatusAction: boolean;
	operation: string;
	setStatus: string;
	roles: UserRole[] = [];

  set(key: string, value: any): Action {
    switch (key) {
			case 'datastore':
				this.datastore = value;
				break;
			case 'action_id':
				this.id = value;
				break;
			case 'display_id':
				this.displayId = value;
				break;
			case 'name':
				this.name = value;
				break;
			case 'is_status_action':
				this.isStatusAction = value;
				break;
			case 'operation':
				this.operation = value;
				break;
			case 'set_status':
				this.setStatus = value;
				break;
			case 'role':
				this.roles = (value as any[])
					.map(role => UserRole.fromJson(role) as UserRole);
		}
		return this;
	}
}
