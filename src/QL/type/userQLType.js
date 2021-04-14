import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql'

import locationQLType from './locationQLType'
import OrderQLType from './orderQLType'
import UserTypesQLEnum from '@QL/enums/userTypesQLEnum'

const UserQLType = new GraphQLObjectType({
  name: 'UserQLType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    userType: { type: UserTypesQLEnum },

    orders: { type: new GraphQLNonNull(new GraphQLList(OrderQLType)) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },

    location: { type: new GraphQLNonNull(locationQLType.LocationQLType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) }
  })
})

export default UserQLType

