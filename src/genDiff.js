import parseFile from './parsers.js';
import buildAst from './buildAst.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parseFile(filepath1);
  const obj2 = parseFile(filepath2);
  const ast = buildAst(obj1, obj2);
  const formatter = getFormatter(format);
  return formatter(ast);
};

export default genDiff;
