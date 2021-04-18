import 'module-alias/register'
import request from 'supertest'
import { expect } from 'chai'

import { httpServer } from '@/server'
import db from '@/database'
import { removeAllDecouments } from '../../testUtils/testUtils'
import { authToken } from '../../testUtils/authTestUtils'

import itemData from '@/test/testData/itemData'
import userData from '../../testData/userData'
import orderData from '../../testData/orderData'
import itemContext from '@/mongo/context/itemContext'
import userContext from '@/mongo/context/userContext'
import orderContext from '@/mongo/context/orderContext'

describe('Item Error endpoint', () => {
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

  it('can not update an item if there are some orderIds', async () => {
    const user = await userContext.createOne(userData.random())
    const originalItem = await itemContext.createOne(itemData.random({ userId: user.id }))
    const updateItem = itemData.random({ userId: user.id })
    await orderContext.createOne(orderData.random({ userId: user.id, itemId: originalItem.id }))

    const query = `mutation { 
      updateOne(id: "${originalItem._id}" itemState: ${updateItem.itemState}, itemType: ${updateItem.itemType}, 
        location: {lng: ${updateItem.location.lng}, lat: ${updateItem.location.lat}}, title: "${updateItem.title}", 
        price: ${updateItem.price}, imageUrl: "${updateItem.imageUrl}") 
        { id itemState itemType orderIds userId createdAt updatedAt location { lng lat } title price imageUrl } 
      }`
    const response = await request(httpServer).post('/api/v1/item').set('authorization', authToken).send({ query })

    const errorMessage = JSON.parse(response.text)
    expect(errorMessage.errors[0].message.includes('SubEntityAlreadyPresent')).to.be.true
    
    const item = await itemContext.getById(originalItem.id)
    expect(originalItem._id.toString()).to.be.eq(item.id)
    expect(item.createdAt).not.to.be.null && expect(item.createdAt).not.to.be.undefined
    expect(item.updatedAt).not.to.be.null && expect(item.updatedAt).not.to.be.undefined
    expect(item.orderIds.length).to.be.eq(1)
    expect(item.location.id).to.be.eq(originalItem.location.id)
    delete item.id && delete item.createdAt && delete item.updatedAt && delete item.orderIds && delete item.location && delete item.__v

    Object.entries(item).forEach(itemEntry => {
      expect(originalItem[itemEntry[0]]).to.be.eql(itemEntry[1])
    })
  })

  it('can not remove an item if there are some orderIds', async () => {
    const user = await userContext.createOne(userData.random())
    const randomItem = await itemContext.createOne(itemData.random({ userId: user.id }))
    await orderContext.createOne(orderData.random({ userId: user.id, itemId: randomItem.id }))

    const removeQuery = `mutation { 
      removeOne(id: "${randomItem.id}")
        { id itemState itemType orderIds createdAt updatedAt location { lng lat } title price imageUrl } 
      }`
    const response = await request(httpServer).post('/api/v1/item').set('authorization', authToken).send({ query: removeQuery })
    
    const errorMessage = JSON.parse(response.text)
    expect(errorMessage.errors[0].message.includes('SubEntityAlreadyPresent')).to.be.true
    const item = await itemContext.getById(randomItem.id)
    expect(item).not.to.be.null && expect(item).not.to.be.undefined
  })
})

