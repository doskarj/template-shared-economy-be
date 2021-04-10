import Item from '../mongoSchema/itemSchema'
import { transformMongoIdToId } from '../utils'

const createOne = async ({ itemState, itemType, orderIds, createdAt, updatedAt, location, title, price, imageUrl }) => {
  const possibleItem = await Item.findOne({ title }).maxTimeMS(500)
  if (possibleItem) {
    throw 'alreadyCreated'
  }

  const newItem = new Item({ itemState, itemType, orderIds, createdAt, updatedAt, location, title, price, imageUrl })
  const savedItem = await newItem.save()
  return !savedItem || savedItem === {} ? null : savedItem
}

const getAll = async () => {
  const items = await Item.find({}).maxTimeMS(500)
  return !items || items === [] ? null : items
}

const getById = async (id) => {
  const mongoItem = await Item.findById(id).maxTimeMS(500)
  const item = transformMongoIdToId(mongoItem)
  return !item || item === {} ? null : item
}

const removeAll = async () => {
  await Item.deleteMany({})
}

export default {
  getAll,
  getById,
  createOne,
  removeAll
}
