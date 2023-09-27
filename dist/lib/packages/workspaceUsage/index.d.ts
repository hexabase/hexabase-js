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
    set(key: string, value: any): WorkspaceUsage;
}
