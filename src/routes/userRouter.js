import { Router } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { GraphQLSchema } from 'graphql'

import UserQLQuery from '@QL/query/userQLQuery'
import UserQLMutations from '@QL/mutation/userQLMutation'
import { IS_GRAPHIQL_ON } from '@utils/consts'

const userRouter = Router()

userRouter.use('/', graphqlHTTP({
  schema: new GraphQLSchema({
    query: UserQLQuery,
    mutation: UserQLMutations
  }),
  graphiql: IS_GRAPHIQL_ON
}))

export default userRouter