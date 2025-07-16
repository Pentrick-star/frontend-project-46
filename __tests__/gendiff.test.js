import genDiff from '../src/genDiff.js'
import path from 'path'
import fs from 'fs'

const filepath1 = path.resolve('__fixtures__', 'file1.json')
const filepath2 = path.resolve('__fixtures__', 'file2.json')

test('gendiff для плоских json файлов', () => {
  const expected = fs.readFileSync(path.resolve('__fixtures__', 'expected_stylish.txt'), 'utf-8')
  const result = genDiff(filepath1, filepath2)
  expect(result).toBe(expected)
})
