import parseFile from './parsers.js'

const getIndent = (depth) => '    '.repeat(depth)
const getSignIndent = (depth) => '  '.repeat(depth) // для знаков + и -

const formatValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }
  const indent = getIndent(depth + 1)
  const bracketIndent = getIndent(depth)
  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`)
  return `{
${lines.join('\n')}
${bracketIndent}}`
}

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  const iter = (obj1, obj2, depth) => {
    const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort()
    const lines = keys.flatMap((key) => {
      const has1 = Object.prototype.hasOwnProperty.call(obj1, key)
      const has2 = Object.prototype.hasOwnProperty.call(obj2, key)
      const val1 = obj1[key]
      const val2 = obj2[key]
      if (has1 && !has2) {
        return [`${getSignIndent(depth)}- ${key}: ${formatValue(val1, depth)}`]
      }
      if (!has1 && has2) {
        return [`${getSignIndent(depth)}+ ${key}: ${formatValue(val2, depth)}`]
      }
      if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
        return [`${getIndent(depth)}${key}: ${iter(val1, val2, depth + 1)}`]
      }
      if (val1 === val2) {
        return [`${getIndent(depth)}${key}: ${formatValue(val1, depth)}`]
      }
      return [
        `${getSignIndent(depth)}- ${key}: ${formatValue(val1, depth)}`,
        `${getSignIndent(depth)}+ ${key}: ${formatValue(val2, depth)}`
      ]
    })
    return `{
${lines.join('\n')}
${getIndent(depth - 1)}}`
  }

  return iter(data1, data2, 1)
}

export default genDiff 