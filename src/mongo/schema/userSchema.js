import mongoose from 'mongoose'
import LocationSchema from './locationSchema'
import userTypes from '@/enums/userTypes'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  userType: { type: String, enum: Object.values(userTypes), required: true },
  orderIds: [ObjectId],

  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },

  location: LocationSchema,
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: { type: String, required: true }
})

export default mongoose.model('User', userSchema)

