const indentSize = 4

const getIndent = (depth, type = 'base') => {
  const baseIndent = ' '.repeat(depth * indentSize)
  if (type === 'sign') {
    return ' '.repeat(Math.max(depth * indentSize - 2, 0))
  }
  return baseIndent
}

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }

  const entries = Object.entries(value)
  const indent = getIndent(depth + 1)
  const closingIndent = getIndent(depth)

  const lines = entries.map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`,
  )

  return ['{', ...lines, `${closingIndent}}`].join('\n')
}

const stylish = (tree) => {
  const iter = (node, depth) => {
    const lines = node.flatMap((item) => {
      const {
        key, value, oldValue, newValue, children, type,
      } = item

      const currentIndent = getIndent(depth, 'sign')

      switch (type) {
      case 'added':
        return `${currentIndent}+ ${key}: ${stringify(value, depth)}`
      case 'removed':
        return `${currentIndent}- ${key}: ${stringify(value, depth)}`
      case 'unchanged':
        return `${currentIndent}  ${key}: ${stringify(value, depth)}`
      case 'changed':
        return [
          `${currentIndent}- ${key}: ${stringify(oldValue, depth)}`,
          `${currentIndent}+ ${key}: ${stringify(newValue, depth)}`,
        ]
      case 'nested':
        return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`
      default:
        throw new Error(`Unknown type: '${type}'`)
      }
    })

    return ['{', ...lines, `${getIndent(depth)}}`].join('\n')
  }

  return iter(tree, 0)
}

export default stylish
