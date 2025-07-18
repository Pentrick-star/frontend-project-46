import { fileURLToPath } from 'url'
import path from 'path'
import parseFile from '../src/parsers.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFilePath = fileName => path.join(__dirname, '..', '__fixtures__', fileName)

test('parse json and yml files', () => {
  const result = {
    timeout: 20,
    host: 'hexlet.io',
    obj: {
      one: 1,
      two: 'two',
    },
  }

  const jsonFilePath = getFilePath('fileForParse.json')
  const ymlFilePath = getFilePath('fileForParse.yaml')
  expect(parseFile(jsonFilePath)).toEqual(result)
  expect(parseFile(ymlFilePath)).toEqual(result)
})

test('parse non-existent file', () => {
  const nonExistentPath = getFilePath('no-existent-file.json')
  expect(() => parseFile(nonExistentPath)).toThrow()
})

test('parse file with invalid format', () => {
  const filePathWithInvalidFormat = getFilePath('fileWithInvalidFormat.txt')
  expect(() => parseFile(filePathWithInvalidFormat)).toThrow()
})