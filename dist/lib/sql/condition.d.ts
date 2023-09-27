import { SearchCondition } from '../types/item';
export default class QueryCondition {
    static or(conditions: SearchCondition[]): SearchCondition;
    static and(...conditions: SearchCondition[]): SearchCondition;
    static equalTo(key: string, values: any): SearchCondition;
    static greaterThanOrEqualTo(key: string, values: string | number): SearchCondition;
    static lessThan(key: string, values: string | number): SearchCondition;
    static include(key: string, values: string | number): SearchCondition;
    static notInclude(key: string, values: string | number): SearchCondition;
    static inArray(key: string, values: string[] | number[]): SearchCondition;
    static notInArray(key: string, values: string[] | number[]): SearchCondition;
}
