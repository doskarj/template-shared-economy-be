import { GraphQLObjectType, GraphQLString } from 'graphql'

import UserQLType from '@QL/type/userQLType'
import userContext from '@mongo/context/userContext'

const UserQLQuery = new GraphQLObjectType({
  name: 'UserQLQuery',
  fields: {
    user: {
      type: UserQLType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parent, { id }) {
        return await userContext.getById(id)
      }
    }
  }
})

export default UserQLQuery