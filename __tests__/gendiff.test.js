import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { test, expect } from 'vitest'
import genDiff from '../code/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('gendiff flat json', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')
  const expected = readFile('expected-plain.txt').trim()
  const result = genDiff(file1, file2, 'plain').trim()
  expect(result).toBe(expected)
})

test('gendiff flat yaml', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = readFile('expected-flat-plain.txt').trim()
  const result = genDiff(file1, file2, 'plain').trim()
  expect(result).toBe(expected)
})
