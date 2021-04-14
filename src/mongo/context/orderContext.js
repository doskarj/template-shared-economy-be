import Order from '@mongo/schema/orderSchema'
import Item from '@mongo/schema/itemSchema'
import { transformMongoIdToId } from '@utils'

const getAll = async ({ userId }) => {
  const orders = await Order.find({ userId }).maxTimeMS(500)

  await Promise.all(orders.map(async (order) => {
    const item = await Item.findById(order.itemId)
    order.item = transformMongoIdToId(item)
    return order
  }))

  return !orders || orders === [] ? null : orders
}
const getById = async ({ userId, itemId }) => {
  const mongoOrder = await Order.findOne({ userId, itemId }).maxTimeMS(500)
  const order = transformMongoIdToId(mongoOrder)

  const item = await Item.findById(itemId)
  order.item = transformMongoIdToId(item)

  return !order || order === {} ? null : order
}

const createOne = async ({ orderState, itemId, userId, price, location }) => {
  const possibleOrder = await Order.findOne({ itemId, userId }).maxTimeMS(500)
  if (possibleOrder) {
    throw 'EntityAlreadyCreated'
  }

  const item = await Item.findById(itemId).maxTimeMS(500)
  if (!item) {
    throw 'SubEntityNotFound'
  }

  const createdAt = Date.now()
  const newOrder = new Order({ orderState, itemId, userId, createdAt, price, location })
  const savedOrder = await newOrder.save()

  savedOrder.item = item
  return !savedOrder || savedOrder === {} ? null : savedOrder
}
const updateOne = async ({ orderState, itemId, userId }) => {
  const possibleOrder = await Order.findOne({ itemId, userId }).maxTimeMS(500)
  if (!possibleOrder) {
    throw 'EntityNotFound'
  }

  const item = await Item.findById(itemId).maxTimeMS(500)
  if (!item) {
    throw 'SubEntityNotFound'
  }

  const newOrder = await Order.findByIdAndUpdate(
    possibleOrder._id,
    { orderState },
    { new: true, runValidators: true }
  ).exec()
  const savedOrder = await newOrder.save()

  savedOrder.item = item
  return !savedOrder || savedOrder === {} ? null : savedOrder
}

const removeAll = async () => {
  await Order.deleteMany({})
}

export default {
  getAll,
  getById,

  createOne,
  updateOne,

  removeAll
}
