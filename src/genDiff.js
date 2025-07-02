import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  // Собираем все уникальные ключи из обоих объектов
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  // Для каждого ключа определяем, что с ним делать
  const lines = keys.map((key) => {
    if (!_.has(obj2, key)) {
      // Ключ есть только в первом объекте (удалён)
      return `  - ${key}: ${obj1[key]}`;
    }
    if (!_.has(obj1, key)) {
      // Ключ есть только во втором объекте (добавлен)
      return `  + ${key}: ${obj2[key]}`;
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      // Ключ есть в обоих, но значения разные (сначала старое, потом новое)
      return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    }
    // Ключ и значение совпадают
    return `    ${key}: ${obj1[key]}`;
  });

  // Собираем результат
  return `{\n${lines.join('\n')}\n}`;
};

export default genDiff;
