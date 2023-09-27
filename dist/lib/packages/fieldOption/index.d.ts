import { HxbAbstract } from '../../../HxbAbstract';
import Field from '../field';
import { FieldNameENJP } from '../../../lib/util/type';
export default class FieldOption extends HxbAbstract {
    field: Field;
    id: string;
    color: string;
    createdAt: Date;
    displayId: string;
    enabled: boolean;
    selected: boolean;
    sortId: number;
    updatedAt: Date;
    value: FieldNameENJP;
    set(key: string, value: any): FieldOption;
    static all(field: Field): Promise<FieldOption[]>;
}
