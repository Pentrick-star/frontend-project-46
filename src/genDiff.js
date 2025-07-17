import fs from 'fs'
import path from 'path'
import parsers from './parsers.js'
import buildDiff from './diff.js'
import format from './formatters/index.js'

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  return fs.readFileSync(fullPath, 'utf-8')
}

const getFormat = (filepath) => path.extname(filepath).slice(1)

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)

  const format1 = getFormat(filepath1)
  const format2 = getFormat(filepath2)

  const obj1 = parsers(data1, format1)
  const obj2 = parsers(data2, format2)

  const diff = buildDiff(obj1, obj2)

  return format(diff, formatter)
}

export default genDiff
