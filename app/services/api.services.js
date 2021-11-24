import https from 'https'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getWeather = async (city = 'moscow') => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token)
  const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  if (!token) {
    throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
  }
  url.searchParams.append('q', city)
  url.searchParams.append('appid', token)
  url.searchParams.append('units', 'metric')
  url.searchParams.append('lang', 'ru')

  https.get(url, (response) => {
    let result = ''
    response.on('data', (chunk) => {
      result += chunk
    })

    response.on('end', () => {
      console.log(JSON.parse(result))
    })
    response.on('error', (err) => {
      console.log(`Данные не получены, ошибка: ${err}`)
    })
  })
}

export { getWeather }
