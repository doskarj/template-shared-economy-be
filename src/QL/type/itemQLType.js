import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList } from 'graphql'

import locationQLType from './locationQLType'
import ItemStatesQLEnum from '@QL/enums/itemStatesQLEnum'
import ItemTypesQLEnum from '@QL/enums/itemTypesQLEnum'

const ItemQLType = new GraphQLObjectType({
  name: 'ItemQLType',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    itemState: { type: ItemStatesQLEnum },
    itemType: { type: ItemTypesQLEnum },

    orderIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    userId: { type: new GraphQLNonNull(GraphQLString) },

    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: new GraphQLNonNull(GraphQLString) },

    location: { type: new GraphQLNonNull(locationQLType.LocationQLType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    imageUrl: { type: new GraphQLNonNull(GraphQLString) }
  })
})

export default ItemQLType
