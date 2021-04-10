import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql'
import itemQLType from '../QLType/itemQLType'
import itemContext from '../mongoContext/itemContext'

const itemRootQLQuery = new GraphQLObjectType({
  name: 'ItemRootQuery',
  fields: {
    item: {
      type: itemQLType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // TODO: consume args and ID
        console.log(args)
        return await itemContext.getAll()[0]
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