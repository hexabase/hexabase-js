import { HxbAbstract } from '../../../HxbAbstract';
import Item from '../item';
export default class ItemStatus extends HxbAbstract {
    item: Item;
    id: string;
    displayId: string;
    name: string;
    set(key: string, value: any): ItemStatus;
}
