import { HxbAbstract } from '../../../HxbAbstract';
export default class UserRole extends HxbAbstract {
    canExecute: boolean;
    canUse: boolean;
    type: string;
    name: string;
    displayId: string;
    id: string;
    set(key: string, value: any): UserRole;
}
