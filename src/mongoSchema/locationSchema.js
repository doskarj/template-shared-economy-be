import mongoose from 'mongoose'
const Schema = mongoose.Schema

const locationSchema = new Schema({
  lat: { type: Number, min: -90, max: 90, required: true },
  lng: { type: Number, min: -180, max: 180, required: true }
})

export default locationSchema
