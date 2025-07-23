import { test, expect } from 'vitest';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../code/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('gendiff plain json (nested)', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expected-plain.txt');
  const result = genDiff(file1, file2, 'plain').trim();
  expect(result).toBe(expected);
});

test('gendiff plain yaml (flat)', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expected = readFile('expected-flat-plain.txt');
  const result = genDiff(file1, file2, 'plain').trim();
  expect(result).toBe(expected);
});
