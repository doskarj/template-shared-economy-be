import mongoose from 'mongoose'
import LocationSchema from './locationSchema'
import orderStates from '@/enums/orderStates'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const orderSchema = new Schema({
  itemId: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },

  orderState: { type: String, enum: Object.values(orderStates), required: true },

  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },

  price: { type: Number, required: true },
  location: LocationSchema
})

export default mongoose.model('Order', orderSchema)
