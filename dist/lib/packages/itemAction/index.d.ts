import { HxbAbstract } from '../../../HxbAbstract';
import Item from '../item';
export default class ItemAction extends HxbAbstract {
    item: Item;
    id: string;
    displayId: string;
    name: string;
    displayOrder: number;
    crudType: string;
    set(key: string, value: any): ItemAction;
}
