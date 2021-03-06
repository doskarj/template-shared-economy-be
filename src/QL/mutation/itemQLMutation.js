import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql'

import locationQLType from '@QL/type/locationQLType'
import ItemQLType from '@QL/type/itemQLType'
import ItemStatesQLEnum from '@QL/enums/itemStatesQLEnum'
import ItemTypesQLEnum from '@QL/enums/itemTypesQLEnum'
import itemContext from '@mongo/context/itemContext'
import auth from '@/auth/auth'

const ItemQLMutations = new GraphQLObjectType({
  name: 'ItemQLMutations',
  fields: {

    createOne: {
      type: ItemQLType,
      args: {
        itemState: { type: ItemStatesQLEnum },
        itemType: { type: ItemTypesQLEnum },
        userId: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: locationQLType.LocationQLInputType },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        imageUrl: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args, context) {
        if (!await auth.isAuthenticated(context)) {
          auth.handleNotAuthenticated()
        }
        
        const item = await itemContext.createOne(args)
        return item
      }
    },

    updateOne: {
      type: ItemQLType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        itemState: { type: ItemStatesQLEnum },
        itemType: { type: ItemTypesQLEnum },
        title: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: locationQLType.LocationQLInputType },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        imageUrl: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args, context) {
        if (!await auth.isAuthenticated(context)) {
          auth.handleNotAuthenticated()
        }

        const item = await itemContext.updateOne(args)
        return item
      }
    },

    removeOne: {
      type: ItemQLType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args, context) {
        if (!await auth.isAuthenticated(context)) {
          auth.handleNotAuthenticated()
        }

        const item = await itemContext.removeOne(args)
        return item
      }
    }

  }
})

export default ItemQLMutations