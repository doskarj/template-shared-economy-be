import { Router } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'

import itemQLQuery from '../QLQuery/itemQLQuery'
import itemQLMutation from '../QLMutation/itemQLMutation'
import { IS_GRAPHIQL_ON } from '../utils/consts'

const itemRouter = Router()

itemRouter.use('/', graphqlHTTP({
  schema: new GraphQLSchema({
    query: itemQLQuery.ItemQuery,
    mutation: itemQLMutation.ItemMutations
  }),
  graphiql: IS_GRAPHIQL_ON
}))

export default itemRouter