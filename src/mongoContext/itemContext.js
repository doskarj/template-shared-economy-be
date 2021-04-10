import Item from '../mongoSchema/ItemSchema'

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

const removeAll = async () => {
  await Item.deleteMany({})
}

export default {
  createOne,
  getAll,
  removeAll
}
