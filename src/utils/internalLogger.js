import { PORT, SERVER_IP, NODE_ENV, DB_URL } from './consts'

export const logServerStart = () => {
  if (NODE_ENV === 'development-test') return
  const protocol = NODE_ENV === 'development' ? 'https' : 'http'
  const URL = `${protocol}://${SERVER_IP}:${PORT}`
  console.log('\x1b[33m' + '\nServer is listening on: ' + '\x1b[0m' + URL)
}
export const logEnvStatus = () => {
  if (NODE_ENV === 'development-test') return
  if (NODE_ENV === 'production') {
    console.log('Your are using ' + '\x1b[31m' + 'PRODUCTION' + '\x1b[0m' + ' environment. Double check, if you really want to use it please... ')
    return
  }
  if (NODE_ENV === 'development') {
    console.log('Your are using ' + '\x1b[32m' + 'DEVELOPMENT' + '\x1b[0m' + ' environment. Let\'s play :) \n')
    return
  }
}
export const logDbConnectSuccess = () => {
  if (NODE_ENV === 'development-test') return
  console.log('\x1b[33m' + '\nDatabase connection: ' + '\x1b[0m' + 'Successfully connected to: ' + DB_URL)
}
export const logDbConnectError = (error) => {
  if (NODE_ENV === 'development-test') return
  console.error(error)
  console.log('\x1b[33m' + '\nDatabase connection: ' + '\x1b[0m' + 'Could not connect to the database. Exiting now...')
}
