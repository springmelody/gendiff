import _ from 'lodash';

const spacesCount = 4;

const getNestedData = (data, nestingLevel) => {
  const keys = Object.keys(data);
  const indent = ' '.repeat(spacesCount * nestingLevel);
  const result = keys.map((key) => {
    const nestingIndent = ' '.repeat(spacesCount * (nestingLevel + 1));
    if (_.isObject(data[key])) {
      return `${nestingIndent}${key}: ${getNestedData(data[key], nestingLevel + 1)}`;
    }
    return `${nestingIndent}${key}: ${data[key]}`;
  });
  return `{\n${result.join('\n')}\n${indent}}`;
};

const getValue = (value, nestingLevel) => (
  _.isObject(value) ? getNestedData(value, nestingLevel) : value);

const generatePrettyFormat = (ast, nestingLevel = 0) => {
  const indent = ' '.repeat(spacesCount * nestingLevel);
  const iter = (node, depth) => {
    switch (node.type) {
      case 'added':
        return `${indent}  + ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'deleted':
        return `${indent}  - ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indent}    ${node.key}: ${getValue(node.value, depth + 1)}`;
      case 'changed':
        return `${indent}  - ${node.key}: ${getValue(node.oldValue, depth + 1)}\n${indent}  + ${node.key}: ${getValue(node.newValue, depth + 1)}`;
      case 'nested':
        return `${indent}    ${node.key}: ${generatePrettyFormat(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown type ${node.type}`);
    }
  };
  return `{\n${ast.map((n) => iter(n, nestingLevel)).join('\n')}\n${indent}}`;
};

export default (ast) => generatePrettyFormat(ast, 0);
