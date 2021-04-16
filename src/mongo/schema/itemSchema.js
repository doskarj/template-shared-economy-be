import mongoose from 'mongoose'
import LocationSchema from './locationSchema'
import itemStates from '@/enums/itemStates'
import itemTypes from '@/enums/itemTypes'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const itemSchema = new Schema({
  itemState: { type: String, enum: Object.values(itemStates), required: true },
  itemType: { type: String, enum: Object.values(itemTypes), required: true },

  orderIds: { type: [ObjectId], default: [] },
  userId: { type: ObjectId, required: true },

  createdAt: { type: String, required: true },
  updatedAt: { type: String, default: String(Date.now()) },

  location: LocationSchema,
  title: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true }
})

export default mongoose.model('Item', itemSchema)
