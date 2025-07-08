const getIndent = (depth, sign = ' ') => '    '.repeat(depth - 1) + sign + ' '

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }

  const entries = Object.entries(value)
  const lines = entries.map(
    ([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`,
  )
  return `{\n${lines.join('\n')}\n${'    '.repeat(depth)}}`
}

const stylish = (ast, depth = 1) => {
  const lines = ast.map((node) => {
    switch (node.type) {
    case 'added':
      return `${getIndent(depth, '+')}${node.key}: ${stringify(node.value, depth)}`
    case 'removed':
      return `${getIndent(depth, '-')}${node.key}: ${stringify(node.value, depth)}`
    case 'unchanged':
      return `${getIndent(depth)}${node.key}: ${stringify(node.value, depth)}`
    case 'changed': {
      const oldLine = `${getIndent(depth, '-')}${node.key}: ${stringify(node.oldValue, depth)}`
      const newLine = `${getIndent(depth, '+')}${node.key}: ${stringify(node.newValue, depth)}`
      return `${oldLine}\n${newLine}`
    }
    case 'nested':
      return `${getIndent(depth)}${node.key}: ${stylish(node.children, depth + 1)}`
    default:
      throw new Error(`Unknown type: ${node.type}`)
    }
  })
  return `{\n${lines.join('\n')}\n${'    '.repeat(depth - 1)}}`
}

export default stylish
