import { homedir } from 'os'
import { join } from 'path'
import { constants, promises } from 'fs'

const dirPath = join(homedir(), '.weather')

const filePath = join(dirPath, 'data.json')

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city',
}

const isExist = async (path) => {
  try {
    await promises.access(path, constants.F_OK)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Сохраняет токен в файле ( проверяя существует ли путь до файла )
 * @param key - ключ значения
 * @param value - значение
 */
const saveKeyValue = async (key, value) => {
  let data = {}

  if (!(await isExist(dirPath))) {
    await promises.mkdir(dirPath)
  }

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    data = JSON.parse(file.toString())
  }
  data[key] = value
  await promises.writeFile(filePath, JSON.stringify(data))
}

/**
 * Возвращает значение по ключу ищ файла
 * @param key - ключ
 * @returns {Promise<undefined|*>} - значение из файла по ключу
 */
const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath)
    const obj = JSON.parse(file.toString())
    return obj[key]
  } else {
    return undefined
  }
}

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }
