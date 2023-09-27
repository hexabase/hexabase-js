import { HxbAbstract } from '../../../HxbAbstract';
import Datastore from '../datastore';
import FieldLayout from '../fieldLayout';
import { FieldNameENJP } from '../../util/type';
import UserRole from '../userRole';
import Item from '../item';
import FieldOption from '../fieldOption';
export default class Field extends HxbAbstract {
    datastore: Datastore;
    id: string;
    name: FieldNameENJP | string;
    displayId: string;
    dataType: string;
    search: boolean;
    showList: boolean;
    asTitle: boolean;
    status: boolean;
    fieldIndex: number;
    titleOrder: number;
    fullText: boolean;
    unique: boolean;
    hideFromApi: boolean;
    hasIndex: boolean;
    minValue: string;
    maxValue: string;
    layout: FieldLayout;
    hideOnInput: boolean;
    roles: UserRole[];
    sizeX: number;
    sizeY: number;
    col: number;
    row: number;
    _options: FieldOption[];
    set(key: string, value: any): Field;
    static all(datastore: Datastore): Promise<Field[]>;
    valid(value: any): boolean;
    _findOption(value: any): FieldOption | undefined;
    value(value: any, options: {
        [key: string]: any;
    }): any;
    _valueDsLookup(value: any, options: {
        [key: string]: any;
    }): Item;
    convert(value: any): Promise<any>;
    static get(datastore: Datastore, fieldId: string): Promise<Field>;
    options(): Promise<FieldOption[] | null>;
}
