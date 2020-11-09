import generatePrettyFormat from './pretty.js';
import generatePlainFormat from './plain.js';
import generateJsonFormat from './json.js';

const format = (ast, formatName) => {
  switch (formatName) {
    case 'pretty':
      return generatePrettyFormat(ast);
    case 'plain':
      return generatePlainFormat(ast);
    case 'json':
      return generateJsonFormat(ast);
    default:
      throw new Error(`Unknown format ${formatName}`);
  }
};

export default format;
