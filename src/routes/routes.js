import express, { Router } from 'express'
import cors from 'cors'

import itemRouter from './itemRouter'
import orderRouter from './orderRouter'
import userRouter from './userRouter'

const routes = Router()

routes.use(express.json())
routes.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

routes.use('/item', itemRouter)
routes.use('/order', orderRouter)
routes.use('/user', userRouter)

routes.use('/', (req, res) => { res.send('Backend with GraphQL for shared-economy app.') })

export default routes