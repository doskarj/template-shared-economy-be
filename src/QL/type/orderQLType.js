import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql'

import locationQLType from './locationQLType'
import OrderStatesQLEnum from '@QL/enums/orderStatesQLEnum'
import ItemQLType from './itemQLType'

const OrderQLType = new GraphQLObjectType({
  name: 'OrderQLType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    orderState: { type: OrderStatesQLEnum },
    userId: { type: new GraphQLNonNull(GraphQLString) },

    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },

    item: { type: new GraphQLNonNull(ItemQLType) },

    price: { type: new GraphQLNonNull(GraphQLInt) },
    location: { type: new GraphQLNonNull(locationQLType.LocationQLType) }
  })
})

export default OrderQLType
