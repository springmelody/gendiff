import _ from 'lodash';

const generateNode = (type, key, valueBefore, valueAfter, children = null) => ({
  type,
  key,
  valueBefore,
  valueAfter,
  children,
});

const generateAst = (before, after) => {
  const uniqueKeys = _.union(Object.keys(before), Object.keys(after)).sort();
  return uniqueKeys.map((key) => {
    if (!_.has(before, key) && _.has(after, key)) {
      return generateNode('added', key, null, after[key]);
    }

    if (_.has(before, key) && !_.has(after, key)) {
      return generateNode('deleted', key, before[key], null);
    }

    if (before[key] === after[key]) {
      return generateNode('unchanged', key, before[key], after[key]);
    }

    if (_.isObject(before[key]) && _.isObject(after[key])) {
      return generateNode('nested', key, null, null, generateAst(before[key], after[key]));
    }

    return generateNode('changed', key, before[key], after[key]);
  });
};

export default generateAst;
