import mongo from './../database/mongo.js'
import Product from './../models/product.js'
import User from './../models/user.js'
import Cart from './../models/cart.js'
import Order from './../models/order.js'

const users = [
  new User({
    name: 'John',
  }),
  new User({
    name: 'Sean',
  }),
  new User({
    name: 'David',
  }),
]

const products = [
  new Product({
    name: 'Cyberpunk 2077',
    price: 55,
    inventory: 5,
  }),
  new Product({
    name: 'BioShock Infinite',
    price: 35,
    inventory: 5,
  }),
  new Product({
    name: 'Ori and the Blind Forest',
    price: 40,
    inventory: 5,
  }),
  new Product({
    name: 'GTA V',
    price: 50,
    inventory: 5,
  }),
  new Product({
    name: 'Ori and the Will of the Wisps',
    price: 40,
    inventory: 5,
  }),
  new Product({
    name: 'Shadow Warrior 3',
    price: 60,
    inventory: 5,
  }),
  new Product({
    name: 'Resident Evil Village',
    price: 50,
    inventory: 5,
  }),
  new Product({
    name: 'Far Cry 6',
    price: 70,
    inventory: 5,
  }),
];

(async () => {
  await mongo.connect()
  await User.deleteMany()
  await Product.deleteMany()
  await Cart.deleteMany()
  await Order.deleteMany()
  for (let i = 0; i < users.length; i++) {
    await users[i].save()
  }
  for (let i = 0; i < products.length; i++) {
    await products[i].save()
  }
  await mongo.disconnect()
})()
