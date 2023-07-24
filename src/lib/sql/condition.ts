import { SearchCondition } from '../types/item';

export default class QueryCondition {
  static or(conditions: SearchCondition[]): SearchCondition {
    const result: SearchCondition = {};
		result.conditions = [...conditions];
		result.use_or_condition = true;
    return result;
  }

  static and(...conditions: SearchCondition[]): SearchCondition {
    const result: SearchCondition = {};
    if (conditions) {
      result.conditions = [...conditions];
    }
    return result;
  }

  static equalTo(key: string, values: any): SearchCondition {
    const conditions: SearchCondition = {};
    conditions.id = key;
    conditions.search_value = values.toString().split(',');
    conditions.exact_match = true;
    return conditions;
  }

  static greaterThanOrEqualTo(key: string, values: string | number): SearchCondition {
    const conditions: SearchCondition = {};
    const search: (string | number | null)[] = values.toString().split(',');
    search.push(null);
    conditions.id = key;
    conditions.search_value = search;

    return conditions;
  }

  static lessThan(key: string, values: string | number): SearchCondition {
    const conditions: SearchCondition = {};
    const search: (string | number | null)[] = values.toString().split(',');
    search.unshift(null);
    conditions.id = key;
    conditions.search_value = search;
    return conditions;
  }

  static include(key: string, values: string | number): SearchCondition {
    const conditions: SearchCondition = {};
    conditions.id = key;
    conditions.search_value = values.toString().split(',');
    return conditions;
  }

  static notInclude(key: string, values: string | number): SearchCondition {
    const conditions: SearchCondition = {};
    conditions.id = key;
    conditions.search_value = values.toString().split(',');
    conditions.not_match = true;
    return conditions;
  }

  static inArray(key: string, values: string[] | number[]): SearchCondition {
    const conditions: SearchCondition = {};
    conditions.id = key;
    conditions.search_value = values;
    conditions.exact_match = true;
    // conditions.isArray = true;
    return conditions;
  }

  static notInArray(key: string, values: string[] | number[]): SearchCondition {
    const conditions: SearchCondition = {};
    conditions.id = key;
    conditions.search_value = values;
    conditions.exact_match = true;
    conditions.not_match = true;
    // conditions.isArray = true;
    return conditions;
  }
}