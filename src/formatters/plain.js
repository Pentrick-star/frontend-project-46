const stringify = (value) => {
  if (value === null) return 'null'
  
  if (typeof value === 'object') return '[complex value]'
  return typeof value === 'string' ? `'${value}'` : String(value)
}

const iter = (tree, ancestry = []) => tree.flatMap((node) => {
  const path = [...ancestry, node.key].join('.')
  
  switch (node.type) {
  case 'added':
    return `Property '${path}' was added with value: ${stringify(node.value)}`
  case 'removed':
    return `Property '${path}' was removed`
  case 'changed':
    return `Property '${path}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`
  case 'nested':
    return iter(node.children, [...ancestry, node.key])
  case 'unchanged':
    return []
  default:
    throw new Error(`Unknown type: ${node.type}`)
  }
})

const plain = (tree) => iter(tree).join('\n')

export default plain
