import generatePrettyFormat from './pretty.js';
import generatePlainFormat from './plain.js';
import generateJsonFormat from './json.js';

const formats = {
  pretty: generatePrettyFormat,
  plain: generatePlainFormat,
  json: generateJsonFormat,
};

export default (ast, formatName) => formats[formatName](ast);
