import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'

const itemQLType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    type: { type: GraphQLString },
    priceTag: { type: GraphQLString }
  })
})

export default itemQLType