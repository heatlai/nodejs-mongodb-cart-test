import express from 'express'
import Cart from './../models/cart.js'
import Product from './../models/product.js'
import { body, validationResult } from 'express-validator'
import Order from './../models/order.js'
import createError from 'http-errors'
import authenticated from './../middleware/authenticated.js'

const router = express.Router()

router.get('/cart', authenticated, async (req, res) => {
  const user = req.user
  const cart = await Cart.findOneOrCreate({ user })
  await cart.populate('items.product')
  res.json(cart)
})

router.post('/cart/add-product',
  authenticated,
  body('qty').isInt().toInt(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(createError(422, { errors: errors.array() }))
      }
      const productId = req.body.productId
      const qty = req.body.qty
      const product = await Product.findById(productId)
      if (!product) {
        return next(createError(404, `Product:${productId} Not Found`))
      }
      const user = req.user
      // load cart
      const cart = await Cart.findOneOrCreate({ user })
      let item = cart.items.find(item => {
        return item.product.equals(product._id)
      })
      if (!item) {
        item = { product, qty }
        cart.items.push(item)
      }
      else {
        item.qty += qty
      }
      if (product.inventory < item.qty) {
        return next(createError(422, `Product:${product.id} 存貨不足！`))
      }
      await cart.save()
      // response
      res.json(cart)
    }
    catch (e) {
      console.error(e)
      res.status(400).json({ message: e.message })
    }
  })

router.post('/cart/checkout', authenticated, async (req, res, next) => {
  try {
    const user = req.user
    // load cart
    const cart = await Cart.findOne({ user }).populate('items.product')
    if (!cart || !cart.items.length) {
      return next(createError(404, '購物車是空的！'))
    }
    // check inventory
    for (let item of cart.items) {
      if(item.product.inventory < item.qty) {
        return next(createError(422, `Product:${item.product.id} 存貨不足！`))
      }
    }
    // calculate amount & update inventory
    let amount = 0
    let items = []
    for (let item of cart.items) {
      items.push({
        productId: item.product._id,
        productName: item.product.name,
        price: item.product.price,
        qty: item.qty,
      })
      amount += item.product.price * item.qty

      item.product.inventory -= item.qty
      await item.product.save()
    }
    // create order
    let order = await Order.create({
      user,
      items,
      amount,
    })
    // clear cart
    await cart.remove()
    // response
    res.json(order)
  }
  catch (e) {
    console.error(e)
    res.status(400).json({ message: e.message })
  }
})

export default router