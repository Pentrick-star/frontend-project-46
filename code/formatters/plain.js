const formatValue = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return `'${value}'`;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'object') return '[complex value]';
  return String(value);
};

const plain = (tree, parent = '') => {
  const lines = tree
    .flatMap((node) => {
      const propertyPath = parent ? `${parent}.${node.key}` : node.key;

      switch (node.type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${propertyPath}' was removed`;
      case 'changed':
        return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'nested':
        return plain(node.children, propertyPath);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${node.type}`);
      }
    });

  return lines.join('\n');
};

export default plain;
