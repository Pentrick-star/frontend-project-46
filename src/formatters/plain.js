import _ from 'lodash'

const formatValue = (value) => {
  if (_.isPlainObject(value)) return `[complex value]`
  if (typeof value === 'string') return `'${value}'`
  return `${value}`
}

export default (differences) => {
  const iter = (currDiff, path = '') => {
    const formattedDiff = currDiff.flatMap((data) => {
      const currPath = `${path}${data.key}`

      if (data.status === 'nested') {
        return [iter(data.children, `${currPath}.`)]
      }

      if (data.status === 'changed') {
        const newValue = formatValue(data.newValue)
        const oldValue = formatValue(data.oldValue)
        return [`Property '${currPath}' was updated. From ${oldValue} to ${newValue}`]
      }
      if (data.status === 'unchanged') {
        return []
      }
      if (data.status === 'added') {
        const currValue = formatValue(data.value)
        return [`Property '${currPath}' was added with value: ${currValue}`]
      }
      if (data.status === 'deleted') {
        return [`Property '${currPath}' was removed`]
      }
      return []
    })

    return formattedDiff.join(`\n`)
  }

  return iter(differences)
}
