import { FieldNameENJP } from '../../util/type';
import { HxbAbstract } from '../../../HxbAbstract';
export default class Status extends HxbAbstract {
  id: string;
  displayId: string;
  name: FieldNameENJP;
  displayedName: string;
  sortId: number;
  x: string;
  y: string;
  set(key: string, value: any): Status {
    switch (key) {
      case 'status_id':
        this.id = value;
        break;
      case 'display_id':
        this.displayId = value;
        break;
      case 'name':
        this.name = value as FieldNameENJP;
        break;
      case 'displayed_name':
        this.displayedName = value;
        break;
      case 'sort_id':
        this.sortId = value;
        break;
      case 'x':
        this.x = value;
        break;
      case 'y':
        this.y = value;
        break;
    }
    return this;
  }
}