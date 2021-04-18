import userContext from '@/mongo/context/userContext'
import itemContext from '@/mongo/context/itemContext'
import orderContext from '@/mongo/context/orderContext'

export const removeAllDecouments = async () => {
  orderContext.removeAll()
  itemContext.removeAll()
  userContext.removeAll()
}