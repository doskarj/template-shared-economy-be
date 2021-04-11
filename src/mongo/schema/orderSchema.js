import mongoose from 'mongoose'
import LocationSchema from './locationSchema'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const orderSchema = new Schema({
  itemId: { type: ObjectId, required: true },
  userId: { type: ObjectId, required: true },

  createdAt: { type: String, required: true },
  updatedAt: { type: String, default: String(Date.now()) },

  price: { type: Number, required: true },
  location: LocationSchema
})

export default mongoose.model('Order', orderSchema)
