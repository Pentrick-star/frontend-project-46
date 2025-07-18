import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import gendiff from '../src/gendiff.js'
import { getDifferences } from '../src/gendiff.js'
import formatData from '../src/formatters/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFilePath = fileName => path.join(__dirname, '..', '__fixtures__', fileName)
const readFile = fileName => fs.readFileSync(getFilePath(fileName), 'utf-8')

const expectedData = { }

beforeAll(() => {
  expectedData.stylish = readFile('expected-stylish.txt')
  expectedData.plain = readFile('expected-plain.txt')
  expectedData.json = readFile('expected-json.json')
})

test('generate difference between json files with stylish/plain/json format', () => {
  const firstFile = getFilePath('file1.json')
  const secondFile = getFilePath('file2.json')

  expect(gendiff(firstFile, secondFile)).toEqual(expectedData.stylish)
  expect(gendiff(firstFile, secondFile, 'plain')).toEqual(expectedData.plain)
  expect(gendiff(firstFile, secondFile, 'json')).toEqual(JSON.stringify(JSON.parse(expectedData.json), null, 2))
})

test('generate difference between yml files with stylish/plain format', () => {
  const firstFile = getFilePath('file1.yml')
  const secondFile = getFilePath('file2.yml')

  expect(gendiff(firstFile, secondFile)).toEqual(expectedData.stylish)
  expect(gendiff(firstFile, secondFile, 'plain')).toEqual(expectedData.plain)
})

test('generate difference between empty objects', () => {
  const difference = getDifferences({}, {})
  expect(formatData(difference, 'stylish')).toEqual(`{\n\n}`)
})

test('generate difference if param is not a plain object', () => {
  expect(() => getDifferences(10, true)).toThrow()
  expect(() => getDifferences(undefined, 'string')).toThrow()
  expect(() => getDifferences({}, null)).toThrow()
})

test('invalid format', () => {
  const difference = getDifferences({}, {})
  expect(() => formatData(difference, 'invalid-format')).toThrow()
})