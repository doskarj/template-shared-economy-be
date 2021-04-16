import Item from '@mongo/schema/itemSchema'
import userContext from '@mongo/context/userContext'
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

const createOne = async ({ itemState, itemType, userId, location, title, price, imageUrl }) => {
  const possibleItem = await Item.findOne({ title }).maxTimeMS(500)
  if (possibleItem) {
    throw 'EntityAlreadyCreated'
  }
  const user = await userContext.getById(userId)
  if (!user) {
    throw 'SubEntityNotFound'
  }

  const createdAt = Date.now()
  const updatedAt = Date.now()
  const newItem = new Item({ itemState, itemType, createdAt, updatedAt, userId, location, title, price, imageUrl })
  const savedItem = await newItem.save()

  return !savedItem || savedItem === {} ? null : savedItem
}
const updateOne = async ({ id, itemState, itemType, location, title, price, imageUrl }) => {
  const possibleItem = await Item.findById(id).maxTimeMS(500)
  if (!possibleItem) {
    throw 'EntityNotFound'
  }
  if (possibleItem.orderIds.length > 0) {
    throw 'SubEntityAlreadyPresent'
  }

  const updatedAt = Date.now()
  const newItem = await Item.findByIdAndUpdate(
    id,
    { itemState, itemType, updatedAt, location, title, price, imageUrl },
    { new: true, runValidators: true }
  ).exec()
  const savedItem = await newItem.save()
  return !savedItem || savedItem === {} ? null : savedItem
}

const removeOne = async ({ id }) => {
  const possibleItem = await Item.findById(id).maxTimeMS(500)
  if (!possibleItem) {
    throw 'EntityNotFound'
  }
  if (possibleItem.orderIds.length > 0) {
    throw 'SubEntityAlreadyPresent'
  }

  const removedItem = await Item.findByIdAndRemove(id)
  return !removedItem || removedItem === {} ? null : removedItem
}
const removeAll = async () => {
  await Item.deleteMany({})
}

export default {
  getAll,
  getById,

  createOne,
  updateOne,

  removeOne,
  removeAll
}
