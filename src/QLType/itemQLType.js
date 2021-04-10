import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList, GraphQLEnumType } from 'graphql'
import LocationQLType from './locationQLType'
import itemStates from '../enums/itemStates'
import itemTypes from '../enums/itemTypes'
import { transformEnumToQLEnum } from '../utils'

const itemQLType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    itemState: {
      type: new GraphQLEnumType({
        name: 'ItemState',
        values: transformEnumToQLEnum(itemStates)
      })
    },
    itemType: {
      type: new GraphQLEnumType({
        name: 'ItemType',
        values: transformEnumToQLEnum(itemTypes)
      })
    },

    orderIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },

    location: { type: new GraphQLNonNull(LocationQLType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    imageUrl: { type: new GraphQLNonNull(GraphQLString) }
  })
})

export default itemQLType
