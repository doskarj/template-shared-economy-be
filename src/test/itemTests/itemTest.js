import 'module-alias/register'
import request from 'supertest'
import { expect } from 'chai'

import { httpServer } from '@/server'
import db from '@/database'

import itemData from '@/test/testData/itemData'
import itemContext from '@/mongo/context/itemContext'

describe('Item endpoint', () => {
  before(async () => {
    await db.connect()
  })
  after(async () => {
    await db.disconnect()
  })
  beforeEach(async () => {
    await itemContext.removeAll()
  })

  it('returns items on /api/v1/item', async () => {
    await itemContext.createOne(itemData.random())
    await itemContext.createOne(itemData.random())
    await itemContext.createOne(itemData.random())
    const query = '{ items { id itemState itemType orderIds createdAt location { lat lng } title price imageUrl }}'

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
    const createdItem = await itemContext.createOne(itemData.random())
    await itemContext.createOne(itemData.random())
    await itemContext.createOne(itemData.random())
    const query = `{ item (id: "${createdItem._id}") { id itemState itemType orderIds createdAt location { lat lng } title price imageUrl }}`

    const response = await request(httpServer).post('/api/v1/item').send({ query })
    const item = JSON.parse(response.text).data.item

    expect(createdItem._id.toString()).to.be.eq(item.id)
    Object.values(item).forEach(itemValue => {
      expect(itemValue).to.not.be.undefined
      expect(itemValue).to.not.be.null
    })
  })

  it('creates item on /api/v1/item', async () => {
    const randomItem = itemData.random()
    const query = `mutation { 
      createOne(itemState: ${randomItem.itemState}, itemType: ${randomItem.itemType}, 
        orderIds: ${randomItem.orderIds.length === 0 ? '[]' : randomItem.orderIds}, createdAt: "${randomItem.createdAt}", 
        location: {lng: ${randomItem.location.lng}, lat: ${randomItem.location.lat}}, title: "${randomItem.title}", 
        price: ${randomItem.price}, imageUrl: "${randomItem.imageUrl}") 
        { id itemState itemType orderIds createdAt location { lng lat } title price imageUrl } 
      }`

    const response = await request(httpServer).post('/api/v1/item').send({ query })
    const item = JSON.parse(response.text).data.createOne

    expect(item.id).not.to.be.null
    expect(item.id).not.to.be.undefined
    delete item.id

    Object.entries(item).forEach(itemEntry => {
      expect(randomItem[itemEntry[0]]).to.be.eql(itemEntry[1])
    })
  })
  it.skip('updates item on /api/v1/item', async () => {
    const originalItem = await itemContext.createOne(itemData.random())
    const updateItem = itemData.random()
    const query = `mutation { 
      updateOne(id: ${originalItem._id} itemState: ${updateItem.itemState}, itemType: ${updateItem.itemType}, 
        orderIds: ${updateItem.orderIds.length === 0 ? '[]' : updateItem.orderIds}, createdAt: "${updateItem.createdAt}", 
        location: {lng: ${updateItem.location.lng}, lat: ${updateItem.location.lat}}, title: "${updateItem.title}", 
        price: ${updateItem.price}, imageUrl: "${updateItem.imageUrl}") 
        { id itemState itemType orderIds createdAt location { lng lat } title price imageUrl } 
      }`

    const response = await request(httpServer).post('/api/v1/item').send({ query })
    const item = JSON.parse(response.text).data.updateOne

    expect(originalItem._id.toString()).to.be.eq(item.id)
    delete item.id

    Object.entries(item).forEach(itemEntry => {
      expect(updateItem[itemEntry[0]]).to.be.eql(itemEntry[1])
    })
  })
})

