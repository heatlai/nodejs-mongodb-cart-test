import 'dotenv/config'
import request from 'supertest'
import app from './../app.js'
import User from './../models/user.js'
import Product from './../models/product.js'
import db from './db.js'
import Cart from './../models/cart.js'

describe('Tests', () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterEach(async () => {
    await db.clearDatabase()
  })

  afterAll(async () => {
    await db.closeDatabase()
  })

  test('POST /cart/add-product', async () => {
    const user = await User.create({ name: 'John' })
    const product = await Product.create({
      name: 'GTA V',
      price: 50,
      inventory: 5,
    })
    const data = {
      productId: product.id,
      qty: 1,
    }

    const res = await request(app).
      post('/cart/add-product').
      send(data).
      expect(200)

    // Check the response type and length
    expect(Array.isArray(res.body.items)).toBeTruthy()
    expect(res.body.items.length).toEqual(1)

    // Check the response data
    expect(res.body.user).toBe(user.id)
    expect(res.body.items[0].product).toBe(product.id)
    expect(res.body.items[0].qty).toBe(1)
  })

  test('POST /cart/checkout', async () => {
    const user = await User.create({ name: 'John' })
    const cart = await Cart.create({ user })
    const product = await Product.create({
      name: 'GTA V',
      price: 50,
      inventory: 5,
    })
    const qty = 2
    cart.items.push({ product, qty })
    await cart.save()

    const res = await request(app).
      post('/cart/checkout').
      expect(200)
    // Check the response type and length
    expect(res.body.amount).toEqual(100)
    expect(res.body.items.length).toEqual(1)

    // Check the response data
    expect(res.body.items[0].productId).toBe(product.id)
    expect(res.body.items[0].productName).toBe(product.name)
    expect(res.body.items[0].price).toBe(product.price)
    expect(res.body.items[0].qty).toBe(qty)
    const freshProduct = await Product.findById(product._id);
    expect(freshProduct.inventory).toEqual(3)
  })
})