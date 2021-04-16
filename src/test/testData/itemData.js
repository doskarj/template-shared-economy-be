import faker from 'faker'
import mongoose from 'mongoose'
import itemStates from '@/enums/itemStates'
import itemTypes from '@/enums/itemTypes'

const random = (nonChangables = {}) => {
  const random = {
    itemState: faker.random.arrayElement(Object.values(itemStates)),
    itemType: faker.random.arrayElement(Object.values(itemTypes)),
    userId: mongoose.Types.ObjectId(),
    location: { lat: faker.datatype.number({ 'min': -90, 'max': 90 }), lng: faker.datatype.number({ 'min': -180, 'max': 180 }) },
    title: faker.commerce.productName(),
    price: faker.datatype.number({ 'min': 50, 'max': 500 }),
    imageUrl: faker.image.imageUrl()
  }

  Object.entries(nonChangables).forEach((entry) => {
    random[entry[0]] = entry[1]
  })

  return random
}

export default {
  random
}
