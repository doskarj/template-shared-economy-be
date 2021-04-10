import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql'
import itemType from '../QLType/itemQLType'
import itemContext from '../mongoContext/itemContext'

const itemMutations = new GraphQLObjectType({
  name: 'ItemMutations',
  fields: {
    addItem: {
      type: itemType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        brand: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLString },
        age: { type: GraphQLInt },
        owner_id: { type: GraphQLID }
      },
      async resolve(parent, args) {
        const item = await itemContext.createItem(args)
        return item
      }
    }
  }
})

export default itemMutations