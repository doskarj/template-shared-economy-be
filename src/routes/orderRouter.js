import { Router } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'

import OrderQLQuery from '@QL/query/orderQLQuery'
import OrderQLMutations from '@QL/mutation/orderQLMutation'
import { IS_GRAPHIQL_ON } from '@utils/consts'

const orderRouter = Router()

orderRouter.use('/', graphqlHTTP({
  schema: new GraphQLSchema({
    query: OrderQLQuery,
    mutation: OrderQLMutations
  }),
  graphiql: IS_GRAPHIQL_ON
}))

export default orderRouter