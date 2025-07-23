import parseFile from './parsers.js'

const getIndent = depth => '    '.repeat(depth)
const getSignLine = (sign, key, value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return `${getIndent(depth - 1)}  ${sign} ${key}: ${value}`
  }
  const lines = Object.entries(value)
    .map(([k, v]) => `${getIndent(depth + 1)}${k}: ${formatValue(v, depth + 2)}`)
  const bracketIndent = getIndent(depth)
  return `${getIndent(depth - 1)}  ${sign} ${key}: {
${lines.join('\n')}
${bracketIndent}}`
}

const formatValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${getIndent(depth)}${key}: ${formatValue(val, depth + 1)}`)
  const bracketIndent = getIndent(depth - 1)
  return `{
${lines.join('\n')}
${bracketIndent}}`
}

const isObject = val => typeof val === 'object' && val !== null

const formatPlainValue = val => {
  if (isObject(val)) return '[complex value]'
  if (typeof val === 'string') return `'${val}'`
  return String(val)
}

const buildDiff = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort()
  return keys.map(key => {
    const has1 = Object.prototype.hasOwnProperty.call(obj1, key)
    const has2 = Object.prototype.hasOwnProperty.call(obj2, key)
    const val1 = obj1[key]
    const val2 = obj2[key]
    if (has1 && !has2) return { type: 'removed', key, value: val1 }
    if (!has1 && has2) return { type: 'added', key, value: val2 }
    if (isObject(val1) && isObject(val2)) return { type: 'nested', key, children: buildDiff(val1, val2) }
    if (val1 !== val2) return { type: 'updated', key, oldValue: val1, newValue: val2 }
    return { type: 'unchanged', key, value: val1 }
  })
}

const formatPlain = (diff, ancestry = []) => {
  const lines = diff.flatMap(node => {
    const property = [...ancestry, node.key].join('.')
    switch (node.type) {
      case 'nested':
        return formatPlain(node.children, [...ancestry, node.key])
      case 'added':
        return `Property '${property}' was added with value: ${formatPlainValue(node.value)}`
      case 'removed':
        return `Property '${property}' was removed`
      case 'updated':
        return `Property '${property}' was updated. From ${formatPlainValue(node.oldValue)} to ${formatPlainValue(node.newValue)}`
      default:
        return []
    }
  })
  return lines.join('\n')
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)

  if (formatName === 'plain') {
    const diff = buildDiff(data1, data2)
    return formatPlain(diff)
  }
  if (formatName === 'json') {
    const diff = buildDiff(data1, data2)
    return JSON.stringify(diff)
  }

  const iter = (obj1, obj2, depth) => {
    const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort()
    const lines = keys.flatMap(key => {
      const has1 = Object.prototype.hasOwnProperty.call(obj1, key)
      const has2 = Object.prototype.hasOwnProperty.call(obj2, key)
      const val1 = obj1[key]
      const val2 = obj2[key]
      if (has1 && !has2) {
        return [getSignLine('-', key, val1, depth)]
      }
      if (!has1 && has2) {
        return [getSignLine('+', key, val2, depth)]
      }
      if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
        return [`${getIndent(depth)}${key}: ${iter(val1, val2, depth + 1)}`]
      }
      if (val1 === val2) {
        return [`${getIndent(depth)}${key}: ${formatValue(val1, depth + 1)}`]
      }
      return [
        getSignLine('-', key, val1, depth),
        getSignLine('+', key, val2, depth),
      ]
    })
    return `{
${lines.join('\n')}
${getIndent(depth - 1)}}`
  }

  return iter(data1, data2, 1)
}

export default genDiff
