import faker from 'faker'
import userTypes from '@/enums/userTypes'

const random = (nonChangables = {}) => {
  const random = {
    userType: faker.random.arrayElement(Object.values(userTypes)),
    location: { lat: faker.datatype.number({ 'min': -90, 'max': 90 }), lng: faker.datatype.number({ 'min': -180, 'max': 180 }) },
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    avatarUrl: faker.image.imageUrl()
  }

  Object.entries(nonChangables).forEach((entry) => {
    random[entry[0]] = entry[1]
  })

  return random
}

export default {
  random
}
