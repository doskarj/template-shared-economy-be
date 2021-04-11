import { GraphQLInputObjectType, GraphQLObjectType, GraphQLInt, GraphQLNonNull } from 'graphql'

const LocationQLType = new GraphQLObjectType({
  name: 'LocationQLType',
  fields: () => ({
    lat: { type: new GraphQLNonNull(GraphQLInt) },
    lng: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

const LocationQLInputType = new GraphQLInputObjectType({
  name: 'LocationQLInputType',
  fields: () => ({
    lat: { type: new GraphQLNonNull(GraphQLInt) },
    lng: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

export default {
  LocationQLType,
  LocationQLInputType
}