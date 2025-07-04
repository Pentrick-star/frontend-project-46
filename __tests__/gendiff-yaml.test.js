import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import parseFile from '../src/parsers.js';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff flat yaml', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile('expected.txt');
  const obj1 = parseFile(file1);
  const obj2 = parseFile(file2);
  expect(genDiff(obj1, obj2)).toBe(expected);
});
