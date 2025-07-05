const stringify = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return value.toString();
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'string') return `'${value}'`;
  return '[complex value]';
};

const iter = (tree, ancestry = []) => tree
  .flatMap((node) => {
    const property = [...ancestry, node.key].join('.');

    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${stringify(node.value)}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`;
      case 'nested':
        return iter(node.children, [...ancestry, node.key]);
      default:
        return [];
    }
  });

const plain = (tree) => iter(tree).join('\n');

export default plain;
