import { GraphQLEnumType } from 'graphql'
import { transformEnumToQLEnum } from '@utils'

import orderStates from '@/enums/orderStates'

const OrderStatesEnum = new GraphQLEnumType({
  name: 'OrderStatesEnum',
  values: transformEnumToQLEnum(orderStates)
})

export default OrderStatesEnum
