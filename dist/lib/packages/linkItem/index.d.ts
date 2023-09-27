import { HxbAbstract } from '../../../HxbAbstract';
import Item from '../item';
export default class LinkItem extends HxbAbstract {
    item: Item;
    linkedItem: Item;
    saved: boolean;
    set(key: string, value: any): LinkItem;
    create(): Promise<boolean>;
    delete(): Promise<boolean>;
}
