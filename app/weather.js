#!/usr/bin/env node

import { getArgs } from './helpers/args.js'
import { printError, printHelp, printSuccess,printWeather } from './services/log.services.js'
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICTIONARY,
} from './services/storage.service.js'
import { getIcon, getWeather } from './services/api.services.js'

/**
 * Сохранение токена
 * @param token - токен строкой
 */
const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан token')
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Токен сохранён')
  } catch (e) {
    printError(e.message)
  }
}

/**
 * Сохранение города
 * @param city - токен строкой
 */
const saveCity = async (city) => {
  if (!city.length) {
    printError('Не передан город')
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSuccess('Город сохранён')
  } catch (e) {
    printError(e.message)
  }
}

/**
 * Получение прогноза погоды
 * @returns {Promise<any>}
 */
const getForecast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('Неверно указан город');
    } else if (e?.response?.status == 401) {
      printError('Неверно указан токен');
    } else {
      printError(e.message);
    }
  }
}

/**
 * Запуск приложения
 */
const initCLI = () => {
  const args = getArgs(process.argv)
  if (args.h) {
    return printHelp()
  }
  if (args.c) {
    return saveCity(args.c)
  }
  if (args.t) {
    return saveToken(args.t)
  }
  return getForecast()
}

initCLI()
