import { HxbAbstract } from '../../HxbAbstract';
import { SearchCondition } from '../types/item';
import { SearchParameter } from '../types/sql';
import { SortOrder } from '../types/sql/input';
import Item from '../packages/item';
import QueryClient from '.';
type MapType = {
    [key: string]: any;
};
export default class Query extends HxbAbstract {
    conditions: SearchCondition;
    query: SearchParameter;
    queryClient: QueryClient;
    useDisplayId: boolean;
    set(key: string, value: any): this;
    select(columns?: string | string[]): Promise<Item[]>;
    where(conditions: SearchCondition | SearchCondition[]): this;
    order<SortOrders extends SortOrder>(values: SortOrders): this;
    limit(value: number): this;
    offset(value: number): this;
    perPage(value: number): this;
    page(value: number): this;
    count(): Promise<number>;
    private _execute;
    private _baseParams;
    insert(params: MapType | MapType[]): Promise<Item | Item[]>;
    private _insert;
    update(params: MapType): Promise<Item[]>;
    private _update;
    delete(): Promise<boolean>;
}
export {};
