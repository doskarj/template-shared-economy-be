import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql'

import locationQLType from '@QL/type/locationQLType'
import itemQLType from '@QL/type/itemQLType'
import itemContext from '@mongo/context/itemContext'
import ItemStatesQLEnum from '@QL/enums/itemStatesQLEnum'
import ItemTypesQLEnum from '@QL/enums/itemTypesQLEnum'

const ItemQLMutations = new GraphQLObjectType({
  name: 'ItemQLMutations',
  fields: {

    createOne: {
      type: itemQLType.ItemType,
      args: {
        itemState: { type: ItemStatesQLEnum },
        itemType: { type: ItemTypesQLEnum },

        orderIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },

        title: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: locationQLType.LocationQLInputType },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        imageUrl: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const item = await itemContext.createOne(args)
        return item
      }
    },

    updateOne: {
      type: itemQLType.ItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        itemState: { type: ItemStatesQLEnum },
        itemType: { type: ItemTypesQLEnum },

        orderIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },

        title: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: locationQLType.LocationQLInputType },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        imageUrl: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const item = await itemContext.updateOne(args)
        return item
      }
    }

  }
})

export default ItemQLMutations