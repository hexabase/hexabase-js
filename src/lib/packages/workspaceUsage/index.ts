import { HxbAbstract } from '../../../HxbAbstract';
import Workspace from '../workspace';

export default class WorkspaceUsage extends HxbAbstract {
	workspace: Workspace;
	usersLimit?: number;
	itemsLimit?: number;
	storage?: number;
	storageLimit?: number;
	users: number;
	datastores: number;
	datastoresLimit?: number;
	items: number;

  set(key: string, value: any): WorkspaceUsage {
    switch (key) {
			case 'workspace':
				this.workspace = value as Workspace;
				break;
			case 'users_limit':
				this.usersLimit = value;
				break;
			case 'items_limit':
				this.itemsLimit = value;
				break;
			case 'storage':
				this.storage = value;
				break;
			case 'storage_limit':
				this.storageLimit = value;
				break;
			case 'users':
				this.users = value;
				break;
			case 'datastores':
				this.datastores = value;
				break;
			case 'datastores_limit':
				this.datastoresLimit = value;
				break;
			case 'items':
				this.items = value;
				break;
		}
		return this;
	}
}