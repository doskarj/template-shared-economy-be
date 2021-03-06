import User from '@mongo/schema/userSchema'
import Order from '@mongo/schema/orderSchema'
import { transformMongoIdToId } from '@utils'

// Used only for unit tests
const getAll = async () => {
  const users = await User.find({}).maxTimeMS(500)
  return !users || users === [] ? null : users
}
const getById = async (id) => {
  const possibleUser = await User.findById(id).maxTimeMS(500)
  if (!possibleUser) {
    throw 'EntityNotFound'
  }
  const orders = await Order.find({ userId: possibleUser._id }).maxTimeMS(500)
  
  const user = transformMongoIdToId(possibleUser)
  user.orders = orders
  return !user || user === {} ? null : user
}

const createOne = async ({ userType, orderIds, location, name, email, avatarUrl }) => {
  const possibleUser = await User.findOne({ email }).maxTimeMS(500)
  if (possibleUser) {
    throw 'EntityAlreadyCreated'
  }

  const createdAt = Date.now()
  const updatedAt = Date.now()
  const newUser = new User({ userType, orderIds, createdAt, updatedAt, location, name, email, avatarUrl })
  const savedUser = await newUser.save()

  const orders = await Order.find({ userId: savedUser._id }).maxTimeMS(500)
  savedUser.orders = orders

  return !savedUser || savedUser === {} ? null : savedUser
}
const updateOne = async ({ id, userType, location, name, avatarUrl }) => {
  const possibleUser = await User.findById(id).maxTimeMS(500)
  if (!possibleUser) {
    throw 'EntityNotFound'
  }

  const updatedAt = Date.now()
  const newUser = await User.findByIdAndUpdate(
    id,
    { userType, updatedAt, location, name, avatarUrl },
    { new: true, runValidators: true }
  ).exec()
  const savedUser = await newUser.save()

  const orders = await Order.find({ userId: savedUser._id }).maxTimeMS(500)
  savedUser.orders = orders

  return !savedUser || savedUser === {} ? null : savedUser
}

const removeOne = async ({ id }) => {
  const possibleUser = await User.findById(id).maxTimeMS(500)
  if (!possibleUser) {
    throw 'EntityNotFound'
  }
  const removedUser = await User.findByIdAndRemove(id)

  return !removedUser || removedUser === {} ? null : removedUser
}
const removeAll = async () => {
  await User.deleteMany({})
}

export default {
  getAll,
  getById,

  createOne,
  updateOne,

  removeOne,
  removeAll
}
