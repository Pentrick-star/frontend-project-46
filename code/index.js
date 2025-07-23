import parse from '../parsers.js';
import buildDiff from './buildDiff.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const diff = buildDiff(data1, data2);
  const format = getFormatter(formatName);
  return format(diff);
};

export default genDiff;
