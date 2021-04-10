import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import itemQLType from '../QLType/itemQLType'
import itemContext from '../mongoContext/itemContext'

const ItemQuery = new GraphQLObjectType({
  name: 'ItemQuery',
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

export default {
  ItemQuery
}