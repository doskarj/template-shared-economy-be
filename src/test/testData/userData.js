import mongoose from 'mongoose'
import faker from 'faker'
import userTypes from '@/enums/userTypes'

const random = (nonChangables = {}) => {
  const random = {
    userType: faker.random.arrayElement(Object.values(userTypes)),
    itemId: mongoose.Types.ObjectId(),
    userId: mongoose.Types.ObjectId(),
    price: faker.datatype.number({ 'min': 50, 'max': 500 }),
    location: { lat: faker.datatype.number({ 'min': -90, 'max': 90 }), lng: faker.datatype.number({ 'min': -180, 'max': 180 }) },
  }

  Object.entries(nonChangables).forEach((entry) => {
    random[entry[0]] = entry[1]
  })

  return random
}

export default {
  random
}
