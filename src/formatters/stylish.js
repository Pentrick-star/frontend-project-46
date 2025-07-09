const indentSize = 4;

const getIndent = (depth, type = 'normal') => {
  const baseIndent = ' '.repeat(depth * indentSize);
  if (type === 'normal') {
    return baseIndent;
  }
  if (type === 'sign') {
    return ' '.repeat(depth * indentSize - 2);
  }
  return baseIndent;
};

const stringify = (value, depth) => {
  if (value === null) return 'null';
  if (typeof value !== 'object') return String(value);

  const indent = getIndent(depth + 1, 'normal');
  const closingIndent = getIndent(depth, 'normal');

  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`
  );

  return ['{', ...lines, `${closingIndent}}`].join('\n');
};

const stylish = (ast, depth = 0) => {
  const lines = ast.flatMap((node) => {
    const indentNormal = getIndent(depth, 'normal');
    const indentSign = getIndent(depth, 'sign');

    switch (node.type) {
      case 'added':
        return `${indentSign}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'removed':
        return `${indentSign}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'unchanged':
        return `${indentNormal}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indentSign}- ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
          `${indentSign}+ ${node.key}: ${stringify(node.newValue, depth + 1)}`
        ].join('\n');
      case 'nested':
        return `${indentNormal}  ${node.key}: ${stylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return ['{', ...lines, `${getIndent(depth, 'normal')}}`].join('\n');
};

export default stylish;
