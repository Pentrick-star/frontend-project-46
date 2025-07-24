const makeIndent = (depth, spaces = 4) => ' '.repeat(depth * spaces - 2)
const bracketIndent = (depth, spaces = 4) => ' '.repeat((depth - 1) * spaces)

const stringify = (data, depth) => {
  if (typeof data !== 'object' || data === null) return String(data)
  const entries = Object.entries(data)
  const indent = makeIndent(depth + 1)
  const lines = entries.map(([key, val]) => {
    return `${indent}  ${key}: ${stringify(val, depth + 1)}`
  })
  return `{\n${lines.join('\n')}\n${bracketIndent(depth + 1)}}`
}

const stylish = (tree, depth = 1) => {
  const indent = makeIndent(depth)

  const lines = tree.map(node => {
    switch (node.type) {
    case 'added':
      return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`
    case 'removed':
      return `${indent}- ${node.key}: ${stringify(node.value, depth)}`
    case 'changed':
      return [
        `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
        `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
      ].join('\n')
    case 'nested':
      return `${indent}  ${node.key}: ${stylish(node.children, depth + 1)}`
    case 'unchanged':
      return `${indent}  ${node.key}: ${stringify(node.value, depth)}`
    default:
      throw new Error(`Неизвестный тип: ${node.type}`)
    }
  })

  return `{\n${lines.join('\n')}\n${bracketIndent(depth)}}`
}

export default stylish
