import { GraphQLEnumType } from 'graphql'
import { transformEnumToQLEnum } from '@utils'

import itemStates from '@/enums/itemStates'

const ItemStatesEnum = new GraphQLEnumType({
  name: 'ItemStatesEnum',
  values: transformEnumToQLEnum(itemStates)
})

export default ItemStatesEnum
