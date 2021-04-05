import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { PORT, SERVER_IP } from './utils/consts'
import { logServerStart, logEnvStatus } from './utils/internalLogger'

import itemSchema from './graphSchema/itemSchema'

const createHttpServer = () => {
  const httpServer = express()
  httpServer.use('/api/items', graphqlHTTP({
    schema: itemSchema,
    graphiql: true
  }))
  return httpServer
}

// Export is used only in unit-testing
export const httpServer = createHttpServer()

export default () => {
  httpServer.listen(PORT, SERVER_IP, () => {
    logServerStart()
    logEnvStatus()
  })
}
