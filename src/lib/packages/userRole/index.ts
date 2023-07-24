import { HxbAbstract } from '../../../HxbAbstract';

export default class UserRole extends HxbAbstract {
	canExecute: boolean;
	canUse: boolean;
	type: string;
	name: string;
	displayId: string;
	id: string;

  set(key: string, value: any): UserRole {
    switch (key) {
			case 'can_execute':
				this.canExecute = value;
				break;
			case 'can_use':
				this.canUse = value;
				break;
			case 'type':
				this.type = value;
				break;
			case 'name':
				this.name = value;
				break;
			case 'display_id':
				this.displayId = value;
				break;
			case 'role_id':
				this.id = value;
				break;
		}
		return this;
	}
}