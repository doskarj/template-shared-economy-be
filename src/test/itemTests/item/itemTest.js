import 'module-alias/register'
import request from 'supertest'
import { expect } from 'chai'

import { httpServer } from '@/server'
import db from '@/database'
import { removeAllDecouments } from '../../testUtils'

import userData from '../../testData/userData'
import itemData from '@/test/testData/itemData'

import userContext from '@/mongo/context/userContext'
import itemContext from '@/mongo/context/itemContext'

describe('Item endpoint', () => {
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

  it('returns items on /api/v1/item', async () => {
    const user = await userContext.createOne(userData.random())
    await itemContext.createOne(itemData.random({ userId: user.id }))
    await itemContext.createOne(itemData.random({ userId: user.id }))
    await itemContext.createOne(itemData.random({ userId: user.id }))

    const query = '{ items { id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl }}'
    const response = await request(httpServer).post('/api/v1/item').send({ query })
    const items = JSON.parse(response.text).data.items

    expect(items.length).to.be.eq(3)
    items.forEach(item => {
      Object.values(item).forEach(itemValue => {
        expect(itemValue).to.not.be.undefined
        expect(itemValue).to.not.be.null
      })
    })
  })
  it('returns item on /api/v1/item', async () => {
    const user = await userContext.createOne(userData.random())
    const createdItem = await itemContext.createOne(itemData.random({ userId: user.id }))
    await itemContext.createOne(itemData.random({ userId: user.id }))
    await itemContext.createOne(itemData.random({ userId: user.id }))

    const query = `{ item (id: "${createdItem._id}") { id itemState itemType orderIds createdAt updatedAt location { lat lng } title price imageUrl }}`
    const response = await request(httpServer).post('/api/v1/item').send({ query })
    const item = JSON.parse(response.text).data.item

    expect(createdItem._id.toString()).to.be.eq(item.id)
    Object.values(item).forEach(itemValue => {
      expect(itemValue).to.not.be.undefined
      expect(itemValue).to.not.be.null
    })
  })

  it('creates item on /api/v1/item', async () => {
    const user = await userContext.createOne(userData.random())
    const randomItem = itemData.random({ userId: user.id })

    const query = `mutation { 
      createOne(itemState: ${randomItem.itemState}, itemType: ${randomItem.itemType}, userId: "${user.id}",
        location: {lng: ${randomItem.location.lng}, lat: ${randomItem.location.lat}}, title: "${randomItem.title}", 
        price: ${randomItem.price}, imageUrl: "${randomItem.imageUrl}") 
        { id itemState itemType orderIds userId createdAt updatedAt location { lng lat } title price imageUrl } 
      }`
    const response = await request(httpServer).post('/api/v1/item').send({ query })
    const item = JSON.parse(response.text).data.createOne

    expect(item.id).not.to.be.null && expect(item.id).not.to.be.undefined
    expect(Number(item.updatedAt)).to.be.eq(Number(item.createdAt))
    delete item.id && delete item.createdAt && delete item.updatedAt
    
    // Does not create/update orderIds on this endpoint
    expect(item.orderIds).to.be.eql([])
    delete item.orderIds
    
    Object.entries(item).forEach(itemEntry => {
      expect(randomItem[itemEntry[0]]).to.be.eql(itemEntry[1])
    })
  })
  it('updates item on /api/v1/item', async () => {
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
    const item = JSON.parse(response.text).data.updateOne

    expect(originalItem._id.toString()).to.be.eq(item.id)
    expect(Number(item.updatedAt)).to.be.above(Number(item.createdAt))
    delete item.id && delete item.createdAt && delete item.updatedAt

    // Does not create/update orderIds on this endpoint
    expect(item.orderIds).to.be.eql([])
    delete item.orderIds

    Object.entries(item).forEach(itemEntry => {
      expect(updateItem[itemEntry[0]]).to.be.eql(itemEntry[1])
    })
  })

  it('removes item on /api/v1/item', async () => {
    const user = await userContext.createOne(userData.random())
    const originalItem = await itemContext.createOne(itemData.random({ userId: user.id }))

    const removeQuery = `mutation { 
      removeOne(id: "${originalItem._id}")
        { id itemState itemType orderIds createdAt updatedAt location { lng lat } title price imageUrl } 
      }`
    await request(httpServer).post('/api/v1/item').send({ query: removeQuery })

    const items = await itemContext.getAll()
    expect(items.length).to.be.eq(0)
  })
})

