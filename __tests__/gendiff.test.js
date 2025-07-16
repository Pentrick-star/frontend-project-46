import { test, expect } from '@jest/globals'
import genDiff from '../src/index.js'
import path from 'path'

const getFixturePath = (filename) => path.join('__fixtures__', filename)

test('gendiff flat yaml', () => {
  const file1 = getFixturePath('file1.yml')
  const file2 = getFixturePath('file2.yml')
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

  expect(genDiff(file1, file2)).toBe(expected)
})
