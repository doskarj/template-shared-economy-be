import * as dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })

// There are several config files for several environments:
// development: /config/nodemon.json
// production: /config/prod.env

export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.PORT
export const SERVER_IP = process.env.SERVER_IP
export const DB_URL = process.env.DB_URL

export const IS_GRAPHIQL_ON = process.env.NODE_ENV === 'development'
export const IS_ALIAS_RESOLVER_ON = process.env.NODE_ENV === 'development'

export default {
  auth: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    API_IDENTIFIER: process.env.API_IDENTIFIER
  }
}
