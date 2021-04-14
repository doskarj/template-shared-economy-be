import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql'

import locationQLType from '@QL/type/locationQLType'
import UserQLType from '@QL/type/userQLType'
import UserTypesQLEnum from '@QL/enums/userTypesQLEnum'
import userContext from '@mongo/context/userContext'

const UserQLMutations = new GraphQLObjectType({
  name: 'UserQLMutations',
  fields: {

    createOne: {
      type: UserQLType,
      args: {
        userType: { type: new GraphQLNonNull(UserTypesQLEnum) },
        orderIds: { type: new GraphQLList(GraphQLString) },

        location: { type: locationQLType.LocationQLType },
        name: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        avatarUrl: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const user = await userContext.createOne(args)
        return user
      }
    },

    updateOne: {
      type: UserQLType,
      args: {
        userType: { type: new GraphQLNonNull(UserTypesQLEnum) },
        location: { type: locationQLType.LocationQLType },
        name: { type: GraphQLString },
        avatarUrl: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const user = await userContext.updateOne(args)
        return user
      }
    },

    removeOne: {
      type: UserQLType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const user = await userContext.removeOne(args)
        return user
      }
    }

  }
})

export default UserQLMutations

