import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

import itemQLType from '@QL/type/itemQLType'
import itemContext from '@mongo/context/itemContext'

const ItemQLQuery = new GraphQLObjectType({
  name: 'ItemQLQuery',
  fields: {
    item: {
      type: itemQLType.ItemType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parent, { id }) {
        return await itemContext.getById(id)
      }
    },
    items: {
      type: new GraphQLList(itemQLType.ItemType),
      async resolve() {
        return await itemContext.getAll()
      }
    },
  }
})

export default ItemQLQuery