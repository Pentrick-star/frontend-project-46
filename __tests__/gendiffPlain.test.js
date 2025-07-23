import { expect, test } from 'vitest'
import path from 'path'
import fs from 'fs'
import genDiff from '../code/index.js'

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8')

const file1 = getFixturePath('file1.json')
const file2 = getFixturePath('file2.json')

test('gendiff plain format', () => {
  const expected = readFile('expected-plain.txt')
  const result = genDiff(file1, file2, 'plain')
  expect(result).toBe(expected)
})
