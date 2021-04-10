import { httpServer } from '../../server'
import db from '../../database'
import request from 'supertest'
import { expect } from 'chai'

import itemData from '../testData/itemData'
import itemContext from '../../mongoContext/itemContext'

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
		const query = "{ items { itemState itemType orderIds createdAt location { lat lng } title price imageUrl }}"
    
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
})