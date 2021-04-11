import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'

import ItemQLType from '@QL/type/itemQLType'
import itemContext from '@mongo/context/itemContext'

const ItemQLQuery = new GraphQLObjectType({
  name: 'ItemQLQuery',
  fields: {
    item: {
      type: ItemQLType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve(parent, { id }) {
        return await itemContext.getById(id)
      }
    },
    items: {
      type: new GraphQLList(ItemQLType),
      async resolve() {
        return await itemContext.getAll()
      }
    },
  }
})

export default ItemQLQuery