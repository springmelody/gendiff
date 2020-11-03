import _ from 'lodash';

const boolToString = (item) => {
  if (typeof item !== 'boolean') {
    return item;
  }
  return item ? 'true' : 'false';
};

const getNestedData = (data, nestingLevel) => {
  const numberIndents = 4;
  const keys = Object.keys(data);
  const indent = ' '.repeat(numberIndents * nestingLevel);
  const result = keys.map((key) => {
    const nestingIndent = ' '.repeat(numberIndents * (nestingLevel + 1));
    if (_.isObject(data[key])) {
      return `${nestingIndent}${key}: ${getNestedData(data[key], nestingLevel + 1)}`;
    }
    return `${nestingIndent}${key}: ${data[key]}`;
  });
  return `{\n${result.join('\n')}\n${indent}}`;
};

const getValue = (value, nestingLevel) => (
  _.isObject(value) ? getNestedData(value, nestingLevel) : boolToString(value));

const generatePrettyFormat = (ast, nestingLevel = 0) => {
  const numberIndents = 4;
  const indent = ' '.repeat(numberIndents * nestingLevel);
  const result = ast.map((node) => {
    const valueBefore = getValue(node.valueBefore, nestingLevel + 1);
    const valueAfter = getValue(node.valueAfter, nestingLevel + 1);
    switch (node.type) {
      case 'added':
        return `${indent}  + ${node.key}: ${valueAfter}`;
      case 'deleted':
        return `${indent}  - ${node.key}: ${valueBefore}`;
      case 'unchanged':
        return `${indent}    ${node.key}: ${valueBefore}`;
      case 'changed':
        return `${indent}  - ${node.key}: ${valueBefore}\n${indent}  + ${node.key}: ${valueAfter}`;
      case 'nested':
        return `${indent}    ${node.key}: ${generatePrettyFormat(node.children, nestingLevel + 1)}`;
      default:
        throw new Error(`Unknown type ${node.type}`);
    }
  });
  return `{\n${result.join('\n')}\n${indent}}`;
};

export default generatePrettyFormat;
