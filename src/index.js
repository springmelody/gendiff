import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import generateAst from './generateAst.js';
import chooseFormat from './formatters/index.js';

const checkFiles = (firstPathFile, secondPathFile) => {
  if (path.extname(firstPathFile) !== path.extname(secondPathFile)) {
    throw new Error('Different file types');
  }

  return path.extname(firstPathFile).replace('.', '');
};

const genDiff = (firstPathFile, secondPathFile, format = 'pretty') => {
  const fileFormat = checkFiles(firstPathFile, secondPathFile);
  const firstFile = fs.readFileSync(firstPathFile, 'utf-8');
  const secondFile = fs.readFileSync(secondPathFile, 'utf-8');
  const firstData = parse(fileFormat, firstFile);
  const secondData = parse(fileFormat, secondFile);
  const ast = generateAst(firstData, secondData);
  return chooseFormat(ast, format);
};

export default genDiff;
