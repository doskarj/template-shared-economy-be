import { GraphQLInputObjectType, GraphQLObjectType, GraphQLInt, GraphQLNonNull } from 'graphql'

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    lat: { type: new GraphQLNonNull(GraphQLInt) },
    lng: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

const LocationInputType = new GraphQLInputObjectType({
  name: 'LocationInput',
  fields: () => ({
    lat: { type: new GraphQLNonNull(GraphQLInt) },
    lng: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

export default {
  LocationType,
  LocationInputType
}