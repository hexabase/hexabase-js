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
    roles: UserRole[];
    set(key: string, value: any): Action;
}
