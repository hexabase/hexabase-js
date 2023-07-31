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

  set(key: string, value: any): StatusAction {
    switch (key) {
      case 'action_id':
        this.id = value;
        break;
      case 'display_id':
        this.displayId = value;
        break;
      case 'action_name':
        this.name = value;
        break;
      case 'display_order':
        this.displayOrder = value;
        break;
      case 'crud_type':
        this.crudType = value;
        break;
      case 'item':
        this.item = value as Item;
        break;
      case 'next_status_id':
        this.nextStatusId = value;
        break;
    }
    return this;
  }
}
