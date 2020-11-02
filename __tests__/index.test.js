import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

/* eslint no-underscore-dangle: [2, { "allow": ["__filename", "__dirname"] }] */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff', () => {
  const expected = readFile('result.txt');
  const expectedPlain = readFile('resultPlain.txt');
  const expecteJson = readFile('resultJson.json');

  test('pretty', () => {
    expect(genDiff('__fixtures__/before.json', '__fixtures__/after.json')).toEqual(expected);
  });

  test('plain', () => {
    expect(genDiff('__fixtures__/before.json', '__fixtures__/after.json', 'plain')).toEqual(expectedPlain);
  });

  test('json', () => {
    expect(genDiff('__fixtures__/before.json', '__fixtures__/after.json', 'json')).toEqual(expecteJson);
  });

  test('yaml', () => {
    expect(genDiff('__fixtures__/before.yml', '__fixtures__/after.yml')).toEqual(expected);
  });

  test('ini', () => {
    expect(genDiff('__fixtures__/before.ini', '__fixtures__/after.ini')).toEqual(expected);
  });
});
