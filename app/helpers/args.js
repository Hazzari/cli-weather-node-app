const getArgs = (args) => {
  const res = {
    s: false,
    h: false,
  }

  const [, , ...rest] = args
  rest.forEach((value, index, array) => {
    // проверяем на символ -
    if (value.charAt(0) === '-') {
      if (index === array.length - 1) {
        // Если элемент последний
        res[value.substring(1)] = true
      } else if (array[index + 1].charAt(0) !== '-') {
        // если следующий аргумент не начинается с -
        // берем следующий элемент
        res[value.substring(1)] = array[index + 1]
      } else {
        // если следующий с дефисом
        res[value.substring(1)] = true
      }
    }
  })
  return res
}

export { getArgs }
