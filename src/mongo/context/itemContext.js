import Item from '@mongo/schema/itemSchema'
import { transformMongoIdToId } from '@utils'

const getAll = async () => {
  const items = await Item.find({}).maxTimeMS(500)
  return !items || items === [] ? null : items
}
const getById = async (id) => {
  const mongoItem = await Item.findById(id).maxTimeMS(500)
  const item = transformMongoIdToId(mongoItem)
  return !item || item === {} ? null : item
}

const createOne = async ({ itemState, itemType, orderIds, location, title, price, imageUrl }) => {
  const possibleItem = await Item.findOne({ title }).maxTimeMS(500)
  if (possibleItem) {
    throw 'alreadyCreated'
  }

  const createdAt = Date.now()
  const newItem = new Item({ itemState, itemType, orderIds, createdAt, location, title, price, imageUrl })
  const savedItem = await newItem.save()

  return !savedItem || savedItem === {} ? null : savedItem
}
const updateOne = async ({ id, itemState, itemType, orderIds, location, title, price, imageUrl }) => {
  const possibleItem = await Item.findById(id).maxTimeMS(500)
  if (!possibleItem) {
    throw 'updatingUndefined'
  }

  const createdAt = Date.now()
  const newItem = await Item.findByIdAndUpdate(
    id,
    { itemState, itemType, orderIds, createdAt, location, title, price, imageUrl },
    { new: true, runValidators: true }
  ).exec()
  const savedItem = await newItem.save()
  return !savedItem || savedItem === {} ? null : savedItem
}

const removeAll = async () => {
  await Item.deleteMany({})
}

export default {
  getAll,
  getById,

  createOne,
  updateOne,

  removeAll
}
