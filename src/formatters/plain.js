import _ from 'lodash';

const getValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const generatePlainFormat = (ast, ancestors = '') => {
  const result = ast.reduce((acc, node) => {
    const valueBefore = getValue(node.valueBefore);
    const valueAfter = getValue(node.valueAfter);
    const newAncestors = `${ancestors}${node.key}`;
    switch (node.type) {
      case 'added':
        acc.push(`Property '${newAncestors}' was added with value: ${valueAfter}`);
        break;
      case 'deleted':
        acc.push(`Property '${newAncestors}' was removed`);
        break;
      case 'unchanged':
        acc.push(null);
        break;
      case 'changed':
        acc.push(`Property '${newAncestors}' was updated. From ${valueBefore} to ${valueAfter}`);
        break;
      case 'nested':
        acc.push(generatePlainFormat(node.children, `${newAncestors}.`));
        break;
      default:
        throw new Error(`Unknown type ${node.type}`);
    }
    return acc;
  }, []);
  return _.compact(result).join('\n');
};

export default generatePlainFormat;
