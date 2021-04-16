import 'module-alias/register'
import request from 'supertest'
import { expect } from 'chai'

import { httpServer } from '@/server'
import db from '@/database'

import userData from '@/test/testData/userData'
import itemData from '@/test/testData/itemData'
import orderData from '@/test/testData/orderData'

import userContext from '@/mongo/context/userContext'
import itemContext from '@/mongo/context/itemContext'
import orderContext from '@/mongo/context/orderContext'

describe('User endpoint', () => {
  before(async () => {
    await db.connect()
  })
  after(async () => {
    await db.disconnect()
  })
  beforeEach(async () => {
    await userContext.removeAll()
  })

  it('returns user on /api/v1/user', async () => {
    const createdUser = await userContext.createOne(userData.random())
    const item = await itemContext.createOne(itemData.random({ userId: createdUser.id }))
    const item2 = await itemContext.createOne(itemData.random({ userId: createdUser.id }))
    await userContext.createOne(userData.random())
    await userContext.createOne(userData.random())
    await orderContext.createOne(orderData.random({ userId: createdUser.id, itemId: item.id }))
    await orderContext.createOne(orderData.random({ userId: createdUser.id, itemId: item2.id }))

    const query = `{ user (id: "${createdUser.id}") { 
                     id userType orders { id userId orderState createdAt updatedAt price location { lat lng } 
                   } createdAt updatedAt location { lat lng } name email avatarUrl }
                  }`
    const response = await request(httpServer).post('/api/v1/user').send({ query })
    const user = JSON.parse(response.text).data.user

    expect(createdUser._id.toString()).to.be.eq(user.id)
    expect(user.orders.length).to.be.eq(2)
    Object.values(user).forEach(userValue => {
      expect(userValue).to.not.be.undefined
      expect(userValue).to.not.be.null
    })
  })

  it('creates user on /api/v1/user', async () => {
    const randomUser = userData.random()

    const query = `mutation { 
      createOne(userType: ${randomUser.userType}, location: {lng: ${randomUser.location.lng}, lat: ${randomUser.location.lat}},
                name: "${randomUser.name}", email: "${randomUser.email}", avatarUrl: "${randomUser.avatarUrl}") {
          id userType createdAt updatedAt location { lat lng } name email avatarUrl orders { 
            id userId orderState createdAt updatedAt price location { lat lng }  
          }
        }
      }`
    const response = await request(httpServer).post('/api/v1/user').send({ query })
    const user = JSON.parse(response.text).data.createOne

    expect(user.id).not.to.be.null && expect(user.id).not.to.be.undefined
    expect(user.createdAt).not.to.be.null && expect(user.createdAt).not.to.be.undefined
    expect(user.updatedAt).not.to.be.null && expect(user.updatedAt).not.to.be.undefined
    expect(user.orders).not.to.be.null && expect(user.orders).not.to.be.undefined
    delete user.id && delete user.createdAt && delete user.updatedAt && delete user.orders

    Object.entries(user).forEach(userEntry => {
      expect(randomUser[userEntry[0]]).to.be.eql(userEntry[1])
    })
  })
  it('updates user on /api/v1/user', async () => {
    const originalUser = await userContext.createOne(userData.random())
    const updateUser = userData.random()

    const query = `mutation { 
      updateOne(id: "${originalUser.id}" userType: ${updateUser.userType}, location: {lng: ${updateUser.location.lng}, lat: ${updateUser.location.lat}},
                name: "${updateUser.name}", avatarUrl: "${updateUser.avatarUrl}") {
          id userType createdAt updatedAt location { lat lng } name email avatarUrl orders { 
            id userId orderState createdAt updatedAt price location { lat lng }  
          }
        }
      }`
    const response = await request(httpServer).post('/api/v1/user').send({ query })
    const user = JSON.parse(response.text).data.updateOne

    expect(originalUser._id.toString()).to.be.eq(user.id)
    expect(user.createdAt).not.to.be.null && expect(user.createdAt).not.to.be.undefined
    expect(user.updatedAt).not.to.be.null && expect(user.updatedAt).not.to.be.undefined
    expect(user.orders).not.to.be.null && expect(user.orders).not.to.be.undefined
    expect(user.email).not.to.be.null && expect(user.email).not.to.be.undefined
    delete user.id && delete user.createdAt && delete user.updatedAt && delete user.orders && delete user.email
    
    Object.entries(user).forEach(userEntry => {
      expect(updateUser[userEntry[0]]).to.be.eql(userEntry[1])
    })
  })
})

