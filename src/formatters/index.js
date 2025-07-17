import stylish from './stylish.js'
import plain from './plain.js'

export default (diff, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff)
    case 'plain':
      return plain(diff)
    case 'json':
      return JSON.stringify(diff, null, 2)
    default:
      throw new Error(`Unknown format: ${formatName}`)
  }
}
