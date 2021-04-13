import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql'

import locationQLType from '@QL/type/locationQLType'
import OrderQLType from '@QL/type/orderQLType'
import OrderStatesQLEnum from '@QL/enums/orderStatesQLEnum'
import orderContext from '@mongo/context/orderContext'

const OrderQLMutations = new GraphQLObjectType({
  name: 'OrderQLMutations',
  fields: {

    createOne: {
      type: OrderQLType,
      args: {
        orderState: { type: OrderStatesQLEnum },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        itemId: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        location: { type: locationQLType.LocationQLInputType },
      },
      async resolve(parent, args) {
        const order = await orderContext.createOne(args)
        return order
      }
    },

    updateOne: {
      type: OrderQLType,
      args: {
        orderState: { type: OrderStatesQLEnum },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        itemId: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const order = await orderContext.updateOne(args)
        return order
      }
    },

  }
})

export default OrderQLMutations