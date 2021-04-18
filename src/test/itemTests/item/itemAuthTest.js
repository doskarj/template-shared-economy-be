import 'module-alias/register'
import request from 'supertest'
import { expect } from 'chai'

import { httpServer } from '@/server'
import db from '@/database'
import { removeAllDecouments } from '../../testUtils/testUtils'

import userData from '../../testData/userData'
import itemData from '@/test/testData/itemData'

import userContext from '@/mongo/context/userContext'
import itemContext from '@/mongo/context/itemContext'

describe('Item endpoint (auth)', () => {
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

  it('does not create an item on /api/v1/item when no auth token is provided', async () => {
    const user = await userContext.createOne(userData.random())
    const randomItem = itemData.random({ userId: user.id })

    const query = `mutation { 
      createOne(itemState: ${randomItem.itemState}, itemType: ${randomItem.itemType}, userId: "${user.id}",
        location: {lng: ${randomItem.location.lng}, lat: ${randomItem.location.lat}}, title: "${randomItem.title}", 
        price: ${randomItem.price}, imageUrl: "${randomItem.imageUrl}") 
        { id itemState itemType orderIds userId createdAt updatedAt location { lng lat } title price imageUrl } 
      }`
    const response = await request(httpServer).post('/api/v1/item').send({ query })
    
    const errorMessage = JSON.parse(response.text)
    expect(errorMessage.errors[0].message.includes('Unauthorized operation.')).to.be.true

    const items = await itemContext.getAll()
    expect(items.length).to.be.eq(0)
  })
  it('does not update an item on /api/v1/item when no auth token is provided', async () => {
    const user = await userContext.createOne(userData.random())
    const originalItem = await itemContext.createOne(itemData.random({ userId: user.id }))
    const updateItem = itemData.random({ userId: user.id })

    const query = `mutation { 
      updateOne(id: "${originalItem._id}" itemState: ${updateItem.itemState}, itemType: ${updateItem.itemType}, 
        location: {lng: ${updateItem.location.lng}, lat: ${updateItem.location.lat}}, title: "${updateItem.title}", 
        price: ${updateItem.price}, imageUrl: "${updateItem.imageUrl}") 
        { id itemState itemType orderIds userId createdAt updatedAt location { lng lat } title price imageUrl } 
      }`
    const response = await request(httpServer).post('/api/v1/item').send({ query })

    const errorMessage = JSON.parse(response.text)
    expect(errorMessage.errors[0].message.includes('Unauthorized operation.')).to.be.true
    
    const item = await itemContext.getById(originalItem.id)
    expect(originalItem._id.toString()).to.be.eq(item.id)
    expect(item.createdAt).not.to.be.null && expect(item.createdAt).not.to.be.undefined
    expect(item.updatedAt).not.to.be.null && expect(item.updatedAt).not.to.be.undefined
    expect(item.orderIds.length).to.be.eq(0)
    expect(item.location.id).to.be.eq(originalItem.location.id)
    delete item.id && delete item.createdAt && delete item.updatedAt && delete item.orderIds && delete item.location && delete item.__v

    Object.entries(item).forEach(itemEntry => {
      expect(originalItem[itemEntry[0]]).to.be.eql(itemEntry[1])
    })
  })

  it('does not remove an item on /api/v1/item when no auth token is provided', async () => {
    const user = await userContext.createOne(userData.random())
    const originalItem = await itemContext.createOne(itemData.random({ userId: user.id }))

    const removeQuery = `mutation {
      removeOne(id: "${originalItem._id}")
        { id itemState itemType orderIds createdAt updatedAt location { lng lat } title price imageUrl }
      }`
    const response = await request(httpServer).post('/api/v1/item').send({ query: removeQuery })

    const errorMessage = JSON.parse(response.text)
    expect(errorMessage.errors[0].message.includes('Unauthorized operation.')).to.be.true
    
    const item = await itemContext.getById(originalItem.id)
    expect(item).not.to.be.null && expect(item).not.to.be.undefined
  })
})

