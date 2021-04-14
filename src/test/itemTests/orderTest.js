import 'module-alias/register'
import mongoose from 'mongoose'
import request from 'supertest'
import { expect } from 'chai'

import { httpServer } from '@/server'
import db from '@/database'

import orderData from '@/test/testData/orderData'
import orderContext from '@/mongo/context/orderContext'
import itemData from '@/test/testData/itemData'
import itemContext from '@/mongo/context/itemContext'
import orderStates from '@/enums/orderStates'

describe('Order endpoint', () => {
  before(async () => {
    await db.connect()
  })
  after(async () => {
    await db.disconnect()
  })
  beforeEach(async () => {
    await orderContext.removeAll()
  })

  it('returns orders on /api/v1/order', async () => {
    const userId = mongoose.Types.ObjectId()
    const item = await itemContext.createOne(itemData.random())
    const item2 = await itemContext.createOne(itemData.random())
    const item3 = await itemContext.createOne(itemData.random())
    await orderContext.createOne(orderData.random({ userId, itemId: item.id }))
    await orderContext.createOne(orderData.random({ userId, itemId: item2.id }))
    await orderContext.createOne(orderData.random({ userId, itemId: item3.id }))

    const query = `{ orders(userId: "${userId}") { 
                     userId orderState createdAt updatedAt price location { lat lng } item { 
                         id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl 
                       }
                     }
                   }`

    const response = await request(httpServer).post('/api/v1/order').send({ query })
    const orders = JSON.parse(response.text).data.orders

    expect(orders.length).to.be.eq(3)
    orders.forEach(order => {
      Object.values(order).forEach(orderValue => {
        expect(orderValue).to.not.be.undefined
        expect(orderValue).to.not.be.null
      })
    })
  })
  it('returns order on /api/v1/order', async () => {
    const userId = mongoose.Types.ObjectId()
    const item = await itemContext.createOne(itemData.random())
    const item2 = await itemContext.createOne(itemData.random())
    const createdOrder = await orderContext.createOne(orderData.random({ userId, itemId: item.id }))
    await orderContext.createOne(orderData.random({ userId, itemId: item2.id }))

    const query = `{ order(userId: "${userId}", itemId: "${item.id}") { 
                      id userId orderState createdAt updatedAt price location { lat lng } item { 
                          id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl 
                        }
                      }
                    }`

    const response = await request(httpServer).post('/api/v1/order').send({ query })
    const order = JSON.parse(response.text).data.order

    expect(createdOrder._id.toString()).to.be.eq(order.id)
    Object.values(order).forEach(orderValue => {
      expect(orderValue).to.not.be.undefined
      expect(orderValue).to.not.be.null
    })
  })

  it('creates order on /api/v1/order', async () => {
    const userId = mongoose.Types.ObjectId()
    const item = await itemContext.createOne(itemData.random())
    const randomOrder = orderData.random()

    const query = `mutation {
      createOne(orderState: ${randomOrder.orderState}, itemId: "${item.id}", userId: "${userId}", 
                location: { lng: ${randomOrder.location.lng}, lat: ${randomOrder.location.lat}}, price: ${randomOrder.price}) {
                  id userId orderState createdAt updatedAt price location { lat lng } item { 
                    id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl 
                  }
                }
      }`

    const response = await request(httpServer).post('/api/v1/order').send({ query })
    const order = JSON.parse(response.text).data.createOne

    expect(order.id).not.to.be.null && expect(order.id).not.to.be.undefined
    expect(order.createdAt).not.to.be.null && expect(order.createdAt).not.to.be.undefined
    expect(order.updatedAt).not.to.be.null && expect(order.updatedAt).not.to.be.undefined
    expect(order.userId).to.be.eql(String(userId))
    expect(order.item).not.to.be.null && expect(order.item).not.to.be.undefined
    expect(order.item.id).to.be.eql(item.id)
    delete order.id && delete order.createdAt && delete order.updatedAt && delete order.userId && delete order.item

    Object.entries(order).forEach(orderEntry => {
      expect(randomOrder[orderEntry[0]]).to.be.eql(orderEntry[1])
    })
  })
  it('updates order on /api/v1/order', async () => {
    const userId = mongoose.Types.ObjectId()
    const item = await itemContext.createOne(itemData.random())
    const item2 = await itemContext.createOne(itemData.random())
    await orderContext.createOne(orderData.random({ userId, itemId: item.id, orderState: orderStates.INITIAL }))
    await orderContext.createOne(orderData.random({ userId, itemId: item2.id, orderState: orderStates.INITIAL }))
    const randomOrder = orderData.random({ orderState: orderStates.DELIVERED })

    const query = `mutation {
      updateOne(orderState: ${randomOrder.orderState}, itemId: "${item.id}", userId: "${userId}") {
                  id userId orderState createdAt updatedAt price location { lat lng } item { 
                    id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl 
                  }
                }
      }`

    const response = await request(httpServer).post('/api/v1/order').send({ query })
    const order = JSON.parse(response.text).data.updateOne

    expect(order.id).not.to.be.null && expect(order.id).not.to.be.undefined
    expect(order.createdAt).not.to.be.null && expect(order.createdAt).not.to.be.undefined
    expect(order.updatedAt).not.to.be.null && expect(order.updatedAt).not.to.be.undefined
    expect(order.userId).to.be.eql(String(userId))
    expect(order.item).not.to.be.null && expect(order.item).not.to.be.undefined
    expect(order.item.id).to.be.eql(item.id)

    // Only order state is updatable
    expect(order.orderState).to.be.eql(randomOrder.orderState)
    expect(order.price).not.to.be.eql(randomOrder.price)
  })
})

