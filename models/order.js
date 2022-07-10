import mongoose from 'mongoose'
import User from './../models/user.js'

const { Schema } = mongoose

const itemSchema = new Schema({
  productId: {type: Schema.Types.ObjectId, required: true},
  productName: {type: String, required: true},
  price: {type: Number, required: true},
  qty: {type: Number, required: true},
});

const orderSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: User, required: true},
  items: [itemSchema],
  amount: { type: Number, required: true },
})

const Order = mongoose.model('Order', orderSchema)
export default Order