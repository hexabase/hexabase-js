import { HxbAbstract } from '../../../HxbAbstract';
import Item from '../item';
export default class StatusAction extends HxbAbstract {
    item: Item;
    id: string;
    displayId: string;
    name: string;
    displayOrder: number;
    crudType: string;
    nextStatusId: string;
    set(key: string, value: any): StatusAction;
}
