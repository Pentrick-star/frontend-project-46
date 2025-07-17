import _ from 'lodash'

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]'
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

const iter = (tree, ancestry = []) => tree.flatMap((node) => {
  const path = [...ancestry, node.key].join('.')

  switch (node.type) {
    case 'added':
      return `Property '${path}' was added with value: ${stringify(node.value)}`
    case 'removed':
      return `Property '${path}' was removed`
    case 'changed':
      return `Property '${path}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`
    case 'nested':
      return iter(node.children, [...ancestry, node.key])
    case 'unchanged':
      return []
    default:
      throw new Error(`Unknown type: ${node.type}`)
  }
})

export default (tree) => iter(tree).join('\n')
