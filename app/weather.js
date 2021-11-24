#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printError, printHelp, printSuccess } from './services/log.services.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'
import { getWeather } from './services/api.services.js'

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен!')
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Token сохранēн')
  } catch (e) {
    printError(e.message)
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)
  if (args.h) {
    printHelp()
  }
  if (args.c) {
    printSuccess()
  }
  if (args.t) {
    return saveToken(args.t)
  }
  getWeather().then()
}

await initCLI()
