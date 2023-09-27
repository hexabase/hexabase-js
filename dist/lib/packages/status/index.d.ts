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
    set(key: string, value: any): Status;
}
