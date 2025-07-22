import parseFile from './parsers.js'

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
      return [`  - ${key}: ${val1}`]
    }
    if (!has1 && has2) {
      return [`  + ${key}: ${val2}`]
    }
    if (val1 === val2) {
      return [`    ${key}: ${val1}`]
    }
    return [`  - ${key}: ${val1}`, `  + ${key}: ${val2}`]
  })

  return `{
${lines.join('\n')}
}`
}

export default genDiff 