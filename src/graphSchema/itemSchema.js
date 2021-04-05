import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema, GraphQLList } from 'graphql'

const fakeBookDatabase = [
  { name: 'Book 1', pages: 432, id: 1 },
  { name: 'Book 2', pages: 32, id: 2 },
  { name: 'Book 3', pages: 532, id: 3 }
]

const itemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    type: { type: GraphQLString },
    priceTag: { type: GraphQLString }
  })
})

const rootQuery = new GraphQLObjectType({
  name: 'ItemRootQuery',
  fields: {
    item: {
      type: itemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return fakeBookDatabase.find((item) => { return item.id == args.id })
      }
    },
    items:{
      type: new GraphQLList(itemType),
      resolve() {
        return fakeBookDatabase
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
})