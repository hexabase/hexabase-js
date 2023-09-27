import { HxbAbstract } from '../../../HxbAbstract';
import Field from '../field';
export default class FieldLayout extends HxbAbstract {
    sizeX: number;
    sizeY: number;
    col: number;
    row: number;
    field: Field;
    set(key: string, value: any): FieldLayout;
}
