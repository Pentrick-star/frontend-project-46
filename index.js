import parseFile from './parsers.js'

const genDiff = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  // Пока просто возвращаем оба объекта для проверки
  return JSON.stringify({ data1, data2 }, null, 2)
}

export default genDiff 