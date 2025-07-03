import { fileURLToPath } from 'url';
import path from 'path';
import parseFile from '../src/parsers.js';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff flat json', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(data1, data2)).toBe(expected);
});
