import { GraphQLObjectType, GraphQLInt, GraphQLNonNull } from 'graphql'

const locationQLType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    lat: { type: new GraphQLNonNull(GraphQLInt) },
    lng: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

export default locationQLType