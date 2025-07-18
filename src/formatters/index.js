import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const getFunForFormatting = (format) => {
  switch (format) {
    case 'stylish':
      return stylish
    case 'plain':
      return plain
    case 'json':
      return json
    default:
      throw new Error(`Format "${format}" is invalid. Supported formats: stylish, plain and json!`)
  }
}

export default (data, format) => {
  const formatData = getFunForFormatting(format)
  return formatData(data)
}
