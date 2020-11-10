import _ from 'lodash';

const generateAst = (before, after) => {
  const uniqueKeys = _.union(Object.keys(before), Object.keys(after)).sort();
  return uniqueKeys.map((key) => {
    if (!_.has(before, key)) {
      return { type: 'added', key, value: after[key] };
    }

    if (_.has(before, key) && !_.has(after, key)) {
      return { type: 'deleted', key, value: before[key] };
    }

    if (before[key] === after[key]) {
      return {
        type: 'unchanged', key, value: after[key],
      };
    }

    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return { type: 'nested', key, children: generateAst(before[key], after[key]) };
    }

    return {
      type: 'changed', key, oldValue: before[key], newValue: after[key],
    };
  });
};

export default generateAst;
