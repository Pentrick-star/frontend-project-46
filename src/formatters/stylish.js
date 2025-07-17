import _ from 'lodash'

const indentSize = 4
const makeIndent = (depth, sign = ' ') =>
  ' '.repeat((depth - 1) * indentSize) + sign + ' '
const bracketIndent = (depth) => ' '.repeat((depth - 1) * indentSize)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }
  const lines = Object.entries(value)
    .map(([key, val]) => `${makeIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`)
  return `{\n${lines.join('\n')}\n${bracketIndent(depth)}}`
}

const stylish = (diff, depth = 1) => {
  const lines = diff.flatMap((node) => {
    const {
      key, type, value, valueBefore, valueAfter, children,
    } = node

    switch (type) {
      case 'added':
        return `${makeIndent(depth, '+')}${key}: ${stringify(value, depth)}`
      case 'removed':
        return `${makeIndent(depth, '-')}${key}: ${stringify(value, depth)}`
      case 'changed':
        return [
          `${makeIndent(depth, '-')}${key}: ${stringify(valueBefore, depth)}`,
          `${makeIndent(depth, '+')}${key}: ${stringify(valueAfter, depth)}`,
        ]
      case 'nested':
        return `${makeIndent(depth)}${key}: ${stylish(children, depth + 1)}`
      case 'unchanged':
        return `${makeIndent(depth)}${key}: ${stringify(value, depth)}`
      default:
        throw new Error(`Unknown type: ${type}`)
    }
  })

  return ['{', ...lines, `${bracketIndent(depth)}}`].join('\n')
}

export default stylish
