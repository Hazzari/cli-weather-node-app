import chalk from 'chalk'
import dedent from 'dedent-js'

export const printError = (error) => {
  console.log(chalk.bgRed(` ERROR ${error}`))
}

export const printSuccess = (message) => {
  console.log(chalk.bgGreen(` SUCCESS ${message}`))
}

export const printHelp = () => {
  console.log(
    dedent`${chalk.bgCyan(' HELP ')}
    Без параметров - вывод погоды
    -h вывод справки
    -s [CITY] для установки города
    -t [API_KEY] для сохранения токена
    `
  )
}

// export { printSuccess, printHelp, printError }
