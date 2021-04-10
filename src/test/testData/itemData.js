import faker from 'faker'
import itemStates from '../../enums/itemStates'
import itemTypes from '../../enums/itemTypes'

const random = () => ({
  itemState: faker.random.arrayElement(Object.values(itemStates)),
  itemType: faker.random.arrayElement(Object.values(itemTypes)),

  orderIds: [],
  createdAt: String(Date.now()),

  location: { lat: faker.datatype.number({ 'min': -90, 'max': 90 }), lng: faker.datatype.number({ 'min': -180, 'max': 180 }) },
  title: faker.commerce.productName(),
  price: faker.datatype.number({ 'min': 50, 'max': 500 }),
  imageUrl: faker.image.imageUrl()
})

export default {
  random
}
