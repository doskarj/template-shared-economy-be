import mongoose from 'mongoose'
import { DB_URL } from './utils/consts'
import { logDbConnectSuccess, logDbConnectError } from './utils/internalLogger'

export const connect = async () => {
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    logDbConnectSuccess()
  } catch (error) {
    logDbConnectError(error)
    process.exit()
  }
}

export const disconnect = async () => {

}

export default {
  connect,
  disconnect
}