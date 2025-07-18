import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const getFileFormat = filePath => filePath.split('.').at(-1)

const getFunForParsing = (format) => {
  switch (format) {
    case 'json':
      return JSON.parse
    case 'yml':
    case 'yaml':
      return yaml.load
    default:
      throw new Error(`File format "${format}". Supported formats: json and yml(yaml)!`)
  }
}
export default (filePath) => {
  const fileFormat = getFileFormat(filePath)

  fs.accessSync(filePath, fs.constants.R_OK)

  const fileData = fs.readFileSync(path.resolve(filePath), 'utf-8')
  const parse = getFunForParsing(fileFormat)
  return parse(fileData)
}
