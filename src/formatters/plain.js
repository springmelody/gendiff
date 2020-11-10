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
  const iter = (node) => {
    const newAncestors = `${ancestors}${node.key}`;
    switch (node.type) {
      case 'added':
        return `Property '${newAncestors}' was added with value: ${getValue(node.value)}`;
      case 'deleted':
        return `Property '${newAncestors}' was removed`;
      case 'unchanged':
        return null;
      case 'changed':
        return `Property '${newAncestors}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`;
      case 'nested':
        return generatePlainFormat(node.children, `${newAncestors}.`);
      default:
        throw new Error(`Unknown type ${node.type}`);
    }
  };

  return _.compact(ast.map((n) => iter(n, ancestors))).join('\n');
};

export default (ast) => generatePlainFormat(ast, '');
