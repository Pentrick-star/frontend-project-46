import parseFile from './parsers.js'

const formatValue = (value, depth = 1) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }
  const indent = '    '.repeat(depth)
  const bracketIndent = '    '.repeat(depth - 1)
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`)
  return `{
${lines.join('\n')}
${bracketIndent}}`
}

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)])).sort()

  const lines = keys.flatMap((key) => {
    const has1 = Object.prototype.hasOwnProperty.call(data1, key)
    const has2 = Object.prototype.hasOwnProperty.call(data2, key)
    const val1 = data1[key]
    const val2 = data2[key]
    if (has1 && !has2) {
      return [`  - ${key}: ${formatValue(val1, 1)}`]
    }
    if (!has1 && has2) {
      return [`  + ${key}: ${formatValue(val2, 1)}`]
    }
    if (JSON.stringify(val1) === JSON.stringify(val2)) {
      return [`    ${key}: ${formatValue(val1, 1)}`]
    }
    return [`  - ${key}: ${formatValue(val1, 1)}`, `  + ${key}: ${formatValue(val2, 1)}`]
  })

  return `{
${lines.join('\n')}
}`
}

export default genDiff 