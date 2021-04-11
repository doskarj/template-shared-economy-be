import { httpServer } from '@/server'
import db from '@/database'
import request from 'supertest'
import { expect } from 'chai'

describe('Smoke test', () => {
  before(async () => {
    await db.connect()
  })
  after(async () => {
    await db.disconnect()
  })

  it('Server is running', async () => {
    const getResponse = await request(httpServer).get('/api/v1/')
    expect(getResponse.text).to.be.equal('Backend with GraphQL for shared-economy app.')
  })
})