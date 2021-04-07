import { Router } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'

import itemRootQLQuery from '../QLQuery/itemQLQuery'
import { IS_GRAPHIQL_ON } from '../utils/consts'

const itemRouter = Router()

itemRouter.use('/', graphqlHTTP({
  schema: new GraphQLSchema({ query: itemRootQLQuery }),
  graphiql: IS_GRAPHIQL_ON
}))

export default itemRouter