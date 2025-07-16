import path from 'path'
import fs from 'fs'

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath)
  const data = fs.readFileSync(fullPath, 'utf-8')
  return JSON.parse(data)
}

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)

  console.log('data1', data1)
  console.log('data2', data2)

  return ''
}

export default genDiff
