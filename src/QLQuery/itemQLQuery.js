import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import itemQLType from '../QLType/itemQLType'
import itemContext from '../mongoContext/itemContext'

const itemRootQLQuery = new GraphQLObjectType({
  name: 'ItemRootQuery',
  fields: {
    item: {
      type: itemQLType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, { id }) {
        return await itemContext.getById(id)
      }
    },
    items: {
      type: new GraphQLList(itemQLType),
      async resolve() {
        return await itemContext.getAll()
      }
    },
  }
})

export default itemRootQLQuery