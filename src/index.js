import db from './database'
import startServer from './server'

const initiliaze = async () => {
  await db.connect()
  startServer()
}
 
initiliaze()
