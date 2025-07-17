import genDiff from '../src/index.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8')

test('gendiff stylish json', () => {
  const expected = readFile('correct-stylish.txt')
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(expected.trim())
})
