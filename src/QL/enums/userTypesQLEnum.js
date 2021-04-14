import { GraphQLEnumType } from 'graphql'
import { transformEnumToQLEnum } from '@utils'

import userTypes from '@/enums/userTypes'

const UserTypesEnum = new GraphQLEnumType({
  name: 'UserTypesEnum',
  values: transformEnumToQLEnum(userTypes)
})

export default UserTypesEnum
