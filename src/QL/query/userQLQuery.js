import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

import UserQLType from '@QL/type/userQLType'
import userContext from '@mongo/context/userContext'

const UserQLQuery = new GraphQLObjectType({
  name: 'UserQLQuery',
  fields: {
    item: {
      type: UserQLType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parent, { id }) {
        return await userContext.getById(id)
      }
    },
    items: {
      type: new GraphQLList(UserQLType),
      async resolve() {
        return await userContext.getAll()
      }
    },
  }
})

export default UserQLQuery