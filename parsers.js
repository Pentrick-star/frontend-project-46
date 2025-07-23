import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (content, ext) => {
  if (ext === '.json') return JSON.parse(content);
  if (['.yml', '.yaml'].includes(ext)) return yaml.load(content);
  throw new Error(`Неизвестный формат: ${ext}`);
};

export default (filepath) => {
  const absPath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absPath, 'utf-8');
  const ext = path.extname(filepath);
  return parse(content, ext);
};
