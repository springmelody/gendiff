import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import generateAst from './generateAst.js';
import format from './formatters/index.js';

const genDiff = (firstPathFile, secondPathFile, formatName = 'pretty') => {
  const firstData = fs.readFileSync(path.resolve(firstPathFile), 'utf-8');
  const secondData = fs.readFileSync(path.resolve(secondPathFile), 'utf-8');
  const firstDataFormat = path.extname(firstPathFile).slice(1);
  const secondDataFormat = path.extname(secondPathFile).slice(1);
  const firstParsedData = parse(firstDataFormat, firstData);
  const secondParsedData = parse(secondDataFormat, secondData);
  const ast = generateAst(firstParsedData, secondParsedData);
  return format(ast, formatName);
};

export default genDiff;
