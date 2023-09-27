import { HxbAbstract } from '../../../HxbAbstract';
import Workspace from '../workspace';
import { AddUserResponse } from '../../../lib/types/group';
export default class Group extends HxbAbstract {
    index: number;
    name: string;
    group_id: string;
    id: string;
    children: Group[];
    workspace: Workspace;
    set(key: string, value: any): Group;
    fetch(): Promise<boolean>;
    addByEmail(email: string): Promise<AddUserResponse>;
}
