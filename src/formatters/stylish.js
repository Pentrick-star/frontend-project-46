const getIndent = (depth) => '    '.repeat(depth);

const buildLine = (key, value, depth, sign = ' ') => {
  const indent = getIndent(depth);
  return `${indent}  ${sign} ${key}: ${value}`;
};

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

const stylish = (ast, depth = 0) => {
  const lines = ast.map((node) => {
    switch (node.type) {
      case 'added':
        return buildLine(node.key, stringify(node.value, depth + 1), depth, '+');
      case 'removed':
        return buildLine(node.key, stringify(node.value, depth + 1), depth, '-');
      case 'unchanged':
        return buildLine(node.key, stringify(node.value, depth + 1), depth);
      case 'changed': {
        const oldLine = buildLine(node.key, stringify(node.oldValue, depth + 1), depth, '-');
        const newLine = buildLine(node.key, stringify(node.newValue, depth + 1), depth, '+');
        return `${oldLine}\n${newLine}`;
      }
      case 'nested':
        return `${getIndent(depth)}  ${node.key}: ${stylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });
  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

export default stylish;
