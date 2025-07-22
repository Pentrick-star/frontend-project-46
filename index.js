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

const genDiffTree = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort()
  return keys.map((key) => {
    const has1 = Object.prototype.hasOwnProperty.call(obj1, key)
    const has2 = Object.prototype.hasOwnProperty.call(obj2, key)
    const val1 = obj1[key]
    const val2 = obj2[key]
    if (has1 && !has2) {
      return { type: 'removed', key, value: val1 }
    }
    if (!has1 && has2) {
      return { type: 'added', key, value: val2 }
    }
    if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null) {
      return { type: 'nested', key, children: genDiffTree(val1, val2) }
    }
    if (val1 !== val2) {
      return [
        { type: 'removed', key, value: val1 },
        { type: 'added', key, value: val2 },
      ]
    }
    return { type: 'unchanged', key, value: val1 }
  }).flat()
}

const formatDiff = (tree, depth = 1) => {
  const indent = getIndent(depth)
  const signIndent = indent.slice(2)
  const lines = tree.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${indent}${node.key}: ${formatDiff(node.children, depth + 1)}`
      case 'added':
        return `${signIndent}+ ${node.key}: ${formatValue(node.value, depth)}`
      case 'removed':
        return `${signIndent}- ${node.key}: ${formatValue(node.value, depth)}`
      case 'unchanged':
        return `${indent}${node.key}: ${formatValue(node.value, depth)}`
      default:
        return ''
    }
  })
  return `{
${lines.join('\n')}
${getIndent(depth - 1)}}`
}

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  const tree = genDiffTree(data1, data2)
  return formatDiff(tree)
}

export default genDiff 