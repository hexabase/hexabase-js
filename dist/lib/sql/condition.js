"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryCondition {
    static or(conditions) {
        const result = {};
        result.conditions = [...conditions];
        result.use_or_condition = true;
        return result;
    }
    static and(...conditions) {
        const result = {};
        if (conditions) {
            result.conditions = [...conditions];
        }
        return result;
    }
    static equalTo(key, values) {
        const conditions = {};
        conditions.id = key;
        conditions.search_value = values.toString().split(',');
        conditions.exact_match = true;
        return conditions;
    }
    static greaterThanOrEqualTo(key, values) {
        const conditions = {};
        const search = values.toString().split(',');
        search.push(null);
        conditions.id = key;
        conditions.search_value = search;
        return conditions;
    }
    static lessThan(key, values) {
        const conditions = {};
        const search = values.toString().split(',');
        search.unshift(null);
        conditions.id = key;
        conditions.search_value = search;
        return conditions;
    }
    static include(key, values) {
        const conditions = {};
        conditions.id = key;
        conditions.search_value = values.toString().split(',');
        return conditions;
    }
    static notInclude(key, values) {
        const conditions = {};
        conditions.id = key;
        conditions.search_value = values.toString().split(',');
        conditions.not_match = true;
        return conditions;
    }
    static inArray(key, values) {
        const conditions = {};
        conditions.id = key;
        conditions.search_value = values;
        conditions.exact_match = true;
        return conditions;
    }
    static notInArray(key, values) {
        const conditions = {};
        conditions.id = key;
        conditions.search_value = values;
        conditions.exact_match = true;
        conditions.not_match = true;
        return conditions;
    }
}
exports.default = QueryCondition;
//# sourceMappingURL=condition.js.map