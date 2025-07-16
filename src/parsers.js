import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const ext = path.extname(fullPath).toLowerCase()
  const content = fs.readFileSync(fullPath, 'utf-8')

  if (ext === '.json') {
    return JSON.parse(content)
  }

  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(content)
  }

  throw new Error(`Unsupported file extension: ${ext}`)
}

export default parseFile
