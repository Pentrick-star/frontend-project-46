import fs from 'fs';
import path from 'path';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

const parseFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath);
  const ext = path.extname(absolutePath);

  const data = fs.readFileSync(absolutePath, 'utf-8');

  if (ext === '.json') {
    return JSON.parse(data);
  }
  // В будущем здесь появится поддержка yaml
  throw new Error(`Unsupported file extension: ${ext}`);
};

export default parseFile;
