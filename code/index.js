import parse from './parsers.js'
import buildDiff from './buildDiff.js'
import stylish from './formatters/stylish.js'

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = parse(filepath1)
  const data2 = parse(filepath2)
  const diff = buildDiff(data1, data2)
  if (format === 'stylish') return stylish(diff)
  throw new Error(`Неизвестный формат вывода: ${format}`)
}

export default genDiff
