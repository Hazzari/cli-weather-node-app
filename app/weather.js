#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printError, printHelp, printSuccess } from './services/log.services.js'
import { saveKeyValue } from './services/storage.service.js'

const saveToken = async (token) => {
  if (!token.length) {
    printError('Не передан токен!')
    return
  }
  try {
    await saveKeyValue('token', token)
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
  if (args.s) {
    // printSuccess()
  }
  if (args.t) {
    return saveToken(args.t)
  }
}

await initCLI()
