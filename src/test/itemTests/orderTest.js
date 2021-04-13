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
  // it('updates item on /api/v1/item', async () => {
  //   const originalItem = await itemContext.createOne(itemData.random())
  //   const updateItem = itemData.random()
  //   const query = `mutation {
  //     updateOne(id: "${originalItem._id}" itemState: ${updateItem.itemState}, itemType: ${updateItem.itemType},
  //       orderIds: ${updateItem.orderIds.length === 0 ? '[]' : updateItem.orderIds},
  //       location: {lng: ${updateItem.location.lng}, lat: ${updateItem.location.lat}}, title: "${updateItem.title}",
  //       price: ${updateItem.price}, imageUrl: "${updateItem.imageUrl}")
  //       { id itemState itemType orderIds createdAt updatedAt location { lng lat } title price imageUrl }
  //     }`

  //   const response = await request(httpServer).post('/api/v1/item').send({ query })
  //   const item = JSON.parse(response.text).data.updateOne

  //   expect(originalItem._id.toString()).to.be.eq(item.id)
  //   expect(item.createdAt).not.to.be.null && expect(item.createdAt).not.to.be.undefined
  //   expect(item.updatedAt).not.to.be.null && expect(item.updatedAt).not.to.be.undefined
  //   delete item.id && delete item.createdAt && delete item.updatedAt

  //   Object.entries(item).forEach(itemEntry => {
  //     expect(updateItem[itemEntry[0]]).to.be.eql(itemEntry[1])
  //   })
  // })

  // it('removes item on /api/v1/item', async () => {
  //   const originalItem = await itemContext.createOne(itemData.random())

  //   const removeQuery = `mutation {
  //     removeOne(id: "${originalItem._id}")
  //       { id itemState itemType orderIds createdAt updatedAt location { lng lat } title price imageUrl }
  //     }`
  //   await request(httpServer).post('/api/v1/item').send({ query: removeQuery })

  //   const getAllQuery = '{ items { id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl }}'
  //   const response = await request(httpServer).post('/api/v1/item').send({ query: getAllQuery })

  //   const items = JSON.parse(response.text).data.items
  //   expect(items.length).to.be.eq(0)
  // })
})

