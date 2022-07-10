import express from 'express'
import Product from './../models/product.js'

const router = express.Router()

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    res.send(products)
  }
  catch (e) {
    console.error(e)
    res.status(400).json({ message: e.message })
  }
})

export default router