import { GraphQLEnumType } from 'graphql'
import { transformEnumToQLEnum } from '@utils'

import itemTypes from '@/enums/itemTypes'

const ItemTypesEnum = new GraphQLEnumType({
  name: 'ItemTypesEnum',
  values: transformEnumToQLEnum(itemTypes)
})

export default ItemTypesEnum
