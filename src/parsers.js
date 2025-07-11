import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getAbsolutePath = filepath => path.resolve(process.cwd(), filepath)

const parseFile = (filepath) => {
  const absolutePath = getAbsolutePath(filepath)
  const ext = path.extname(absolutePath).toLowerCase()

  const data = fs.readFileSync(absolutePath, 'utf-8')

  if (ext === '.json') {
    return JSON.parse(data)
  }
  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data)
  }
  throw new Error(`Unsupported file extension: ${ext}`)
}

export default parseFile
