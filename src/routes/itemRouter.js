import { Router } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'

import ItemQLQuery from '@QL/query/itemQLQuery'
import ItemQLMutations from '@QL/mutation/itemQLMutation'
import { IS_GRAPHIQL_ON } from '@utils/consts'

const itemRouter = Router()

itemRouter.use('/', graphqlHTTP({
  schema: new GraphQLSchema({
    query: ItemQLQuery,
    mutation: ItemQLMutations
  }),
  graphiql: IS_GRAPHIQL_ON
}))

export default itemRouter