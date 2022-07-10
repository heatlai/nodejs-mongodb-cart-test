'use strict'
import 'dotenv/config'
import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import cart from './routes/cart.js'
import user from './routes/user.js'
import mongo from './database/mongo.js'
import product from './routes/product.js'
import order from './routes/order.js'

if( process.env.NODE_ENV !== 'test') {
  mongo.connect();
}

const app = express()
if( process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// prevent 304
app.use(function (req, res, next) {
  req.headers['if-none-match'] = 'no-match-for-this'
  next()
})

// routes
app.get('/', (req, res) => {
  res.send(`Hello World.`)
})
app.use(user)
app.use(product)
app.use(order)
app.use(cart)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})
// error handler
app.use(function (err, req, res, next) {
  const status = err.status || 500
  console.log(`ErrorHandler: ${status} ${err.message}`)
  res.status(status).json(err)
})

const PORT = process.env.PORT || 3000
if( process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
}

export default app
