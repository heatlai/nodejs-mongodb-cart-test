import express from 'express'
import Order from './../models/order.js'

const router = express.Router()

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find()
    res.send(orders)
  }
  catch (e) {
    console.error(e)
    res.status(400).json({ message: e.message })
  }
})

export default router