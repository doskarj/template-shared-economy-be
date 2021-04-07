import express from 'express'
import apiRoutes from './routes/routes'

import { PORT, SERVER_IP } from './utils/consts'
import { logServerStart, logEnvStatus } from './utils/internalLogger'

const createHttpServer = () => {
  const httpServer = express()
  httpServer.use('/api/v1', apiRoutes)
  return httpServer
}

// Export is used only in unit-testing
export const httpServer = createHttpServer()

export default () => {
  console.log(httpServer)
  httpServer.listen(PORT, SERVER_IP, () => {
    logServerStart()
    logEnvStatus()
  })
}
