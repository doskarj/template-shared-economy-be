import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql'
import itemQLSchema from '../QLSchema/itemQLSchema'

const fakeBookDatabase = [
  { id: '1', title: 'Item 01', imageUrl: 'Item 01 URL', type: 'TODO: Enum', priceTag: '$$$' },
  { id: '2', title: 'Item 02', imageUrl: 'Item 02 URL', type: 'TODO: Enum', priceTag: '$$' },
  { id: '3', title: 'Item 03', imageUrl: 'Item 03 URL', type: 'TODO: Enum', priceTag: '$$$$' }
]

const itemRootQLQuery = new GraphQLObjectType({
  name: 'ItemRootQuery',
  fields: {
    item: {
      type: itemQLSchema,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return fakeBookDatabase.find((item) => { return item.id == args.id })
      }
    },
    items:{
      type: new GraphQLList(itemQLSchema),
      resolve() {
        return fakeBookDatabase
      }
    },
  }
})

export default itemRootQLQuery