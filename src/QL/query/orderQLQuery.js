import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

import OrderQLType from '@QL/type/orderQLType'
import orderContext from '@mongo/context/orderContext'

const OrderQLQuery = new GraphQLObjectType({
  name: 'OrderQLQuery',
  fields: {
    order: {
      type: OrderQLType,
      args: {
        orderId: { type: GraphQLString },
        userId: { type: GraphQLString }
      },
      async resolve(parent, { orderId, userId }) {
        return await orderContext.getById({ orderId, userId })
      }
    },
    orders: {
      type: new GraphQLList(OrderQLType),
      args: {
        userId: { type: GraphQLString }
      },
      async resolve(parent, { userId }) {
        return await orderContext.getAll({ userId })
      }
    },
  }
})

export default OrderQLQuery