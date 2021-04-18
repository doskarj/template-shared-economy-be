import 'module-alias/register'
import request from 'supertest'
import { expect } from 'chai'

import { httpServer } from '@/server'
import db from '@/database'
import { removeAllDecouments } from '../../testUtils/testUtils'

import userData from '@/test/testData/userData'
import itemData from '@/test/testData/itemData'
import orderData from '@/test/testData/orderData'

import userContext from '@/mongo/context/userContext'
import itemContext from '@/mongo/context/itemContext'
import orderContext from '@/mongo/context/orderContext'

import orderStates from '@/enums/orderStates'

describe('Order endpoint', () => {
  before(async () => {
    await db.connect()
  })
  after(async () => {
    await removeAllDecouments()
    await db.disconnect()
  })
  beforeEach(async () => {
    await removeAllDecouments()
  })

  it('returns orders on /api/v1/order', async () => {
    const user = await userContext.createOne(userData.random())
    const item = await itemContext.createOne(itemData.random({ userId: user.id }))
    const item2 = await itemContext.createOne(itemData.random({ userId: user.id }))
    const item3 = await itemContext.createOne(itemData.random({ userId: user.id }))
    await orderContext.createOne(orderData.random({ userId: user.id, itemId: item.id }))
    await orderContext.createOne(orderData.random({ userId: user.id, itemId: item2.id }))
    await orderContext.createOne(orderData.random({ userId: user.id, itemId: item3.id }))

    const query = `{ orders(userId: "${user.id}") { 
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
    const user = await userContext.createOne(userData.random())
    const item = await itemContext.createOne(itemData.random({ userId: user.id }))
    const item2 = await itemContext.createOne(itemData.random({ userId: user.id }))
    const createdOrder = await orderContext.createOne(orderData.random({ userId: user.id, itemId: item.id }))
    await orderContext.createOne(orderData.random({ userId: user.id, itemId: item2.id }))

    const query = `{ order(userId: "${user.id}", itemId: "${item.id}") { 
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
    const user = await userContext.createOne(userData.random())
    const item = await itemContext.createOne(itemData.random({ userId: user.id }))
    const randomOrder = orderData.random()

    const query = `mutation {
      createOne(orderState: ${randomOrder.orderState}, itemId: "${item.id}", userId: "${user.id}", 
                location: { lng: ${randomOrder.location.lng}, lat: ${randomOrder.location.lat}}, price: ${randomOrder.price}) {
                  id userId orderState createdAt updatedAt price location { lat lng } item { 
                    id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl 
                  }
                }
      }`
    const response = await request(httpServer).post('/api/v1/order').send({ query })
    const order = JSON.parse(response.text).data.createOne

    expect(order.id).not.to.be.null && expect(order.id).not.to.be.undefined
    expect(Number(order.updatedAt)).to.be.eq(Number(order.createdAt))
    expect(order.userId).to.be.eql(String(user.id))
    expect(order.item).not.to.be.null && expect(order.item).not.to.be.undefined
    expect(order.item.id).to.be.eql(item.id)
    delete order.id && delete order.createdAt && delete order.updatedAt && delete order.userId && delete order.item

    Object.entries(order).forEach(orderEntry => {
      expect(randomOrder[orderEntry[0]]).to.be.eql(orderEntry[1])
    })
  })
  it('links new order with meal and user when created', async () => {
    const user = await userContext.createOne(userData.random())
    const item = await itemContext.createOne(itemData.random({ userId: user.id }))
    const item2 = await itemContext.createOne(itemData.random({ userId: user.id }))
    const randomOrder = orderData.random({ itemId: item.id, userId: user.id })
    const randomOrder2 = orderData.random({ itemId: item2.id, userId: user.id })

    const query = `mutation {
      createOne(orderState: ${randomOrder.orderState}, itemId: "${item.id}", userId: "${user.id}", 
                location: { lng: ${randomOrder.location.lng}, lat: ${randomOrder.location.lat}}, price: ${randomOrder.price}) {
                  id userId orderState createdAt updatedAt price location { lat lng } item { 
                    id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl 
                  }
                }
      }`
    await request(httpServer).post('/api/v1/order').send({ query })

    const query2 = `mutation {
      createOne(orderState: ${randomOrder2.orderState}, itemId: "${item2.id}", userId: "${user.id}", 
                location: { lng: ${randomOrder2.location.lng}, lat: ${randomOrder2.location.lat}}, price: ${randomOrder2.price}) {
                  id userId orderState createdAt updatedAt price location { lat lng } item { 
                    id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl 
                  }
                }
      }`
    await request(httpServer).post('/api/v1/order').send({ query: query2 })
    
    const updatedItem = await itemContext.getById(item.id)
    expect(updatedItem.orderIds.length).to.be.eq(1)
    const updatedItem2 = await itemContext.getById(item2.id)
    expect(updatedItem2.orderIds.length).to.be.eq(1)
    const updatedUser = await userContext.getById(user.id)
    expect(updatedUser.orderIds.length).to.be.eq(2)
  })
  it('updates order on /api/v1/order', async () => {
    const user = await userContext.createOne(userData.random())
    const item = await itemContext.createOne(itemData.random({ userId: user.id }))
    const item2 = await itemContext.createOne(itemData.random({ userId: user.id }))
    await orderContext.createOne(orderData.random({ userId: user.id, itemId: item.id, orderState: orderStates.INITIAL }))
    await orderContext.createOne(orderData.random({ userId: user.id, itemId: item2.id, orderState: orderStates.INITIAL }))
    const randomOrder = orderData.random({ orderState: orderStates.DELIVERED })

    const query = `mutation {
      updateOne(orderState: ${randomOrder.orderState}, itemId: "${item.id}", userId: "${user.id}") {
                  id userId orderState createdAt updatedAt price location { lat lng } item { 
                    id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl 
                  }
                }
      }`
    const response = await request(httpServer).post('/api/v1/order').send({ query })
    const order = JSON.parse(response.text).data.updateOne

    expect(order.id).not.to.be.null && expect(order.id).not.to.be.undefined
    expect(Number(order.updatedAt)).to.be.above(Number(order.createdAt))
    expect(order.userId).to.be.eql(String(user.id))
    expect(order.item).not.to.be.null && expect(order.item).not.to.be.undefined
    expect(order.item.id).to.be.eql(item.id)

    // Only order state is updatable
    expect(order.orderState).to.be.eql(randomOrder.orderState)
    expect(order.price).not.to.be.eql(randomOrder.price)
  })
})

