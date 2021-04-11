import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLEnumType } from 'graphql'
import { transformEnumToQLEnum } from '@utils/'

import locationQLType from '@QL/type/locationQLType'
import itemQLType from '@QL/type/itemQLType'
import itemContext from '@mongo/context/itemContext'

import itemStates from '@/enums/itemStates'
import itemTypes from '@/enums/itemTypes'

const ItemMutations = new GraphQLObjectType({
  name: 'ItemMutations',
  fields: {

    createOne: {
      type: itemQLType.ItemType,
      args: {
        itemState: {
          type: new GraphQLEnumType({
            name: 'MutationsItemState',
            values: transformEnumToQLEnum(itemStates)
          })
        },
        itemType: {
          type: new GraphQLEnumType({
            name: 'MutationsItemType',
            values: transformEnumToQLEnum(itemTypes)
          })
        },

        orderIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },

        title: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: locationQLType.LocationInputType },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        imageUrl: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(parent, args) {
        const item = await itemContext.createOne(args)
        return item
      }
    },

    // updateOne: {
    //   type: itemQLType.ItemType,
    //   args: {
    //     id: { type: new GraphQLNonNull(GraphQLString) },
    //     itemState: {
    //       type: new GraphQLEnumType({
    //         name: 'MutationsItemState',
    //         values: transformEnumToQLEnum(itemStates)
    //       })
    //     },
    //     itemType: {
    //       type: new GraphQLEnumType({
    //         name: 'MutationsItemType',
    //         values: transformEnumToQLEnum(itemTypes)
    //       })
    //     },

    //     orderIds: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    //     createdAt: { type: new GraphQLNonNull(GraphQLString) },

    //     title: { type: new GraphQLNonNull(GraphQLString) },
    //     location: { type: locationQLType.LocationInputType },
    //     price: { type: new GraphQLNonNull(GraphQLInt) },
    //     imageUrl: { type: new GraphQLNonNull(GraphQLString) }
    //   },
    //   async resolve(parent, args) {
    //     const item = await itemContext.updateOne(args)
    //     return item
    //   }
    // }

  }
})

export default {
  ItemMutations
}