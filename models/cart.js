import mongoose from 'mongoose'
const { Schema } = mongoose;

import User from './../models/user.js'
import Product from './../models/product.js'

const itemSchema = new Schema({
  product: {type: Schema.Types.ObjectId, required: true, ref: Product},
  qty: {type: Number, required: true},
});

const cartSchema = new Schema({
  items: [itemSchema],
  user: {type: Schema.Types.ObjectId, ref: User, required: true},
}, {
  statics: {
    async findOneOrCreate(condition) {
      let result = await this.findOne(condition)
      if( !result ) {
        result = await this.create(condition)
      }
      return result
    }
  },
  methods: {
    // addProduct(product, qty) {
    //   let item = this.items.find(item => {
    //     return item.product.equals(product._id)
    //   })
    //   if(!item) {
    //     this.items.push({ product, qty })
    //   } else {
    //     item.qty += qty
    //   }
    // },
  }
})

const Cart = mongoose.model('Cart', cartSchema)

export default Cart

// Cart(oldCart) {
//   this.items = oldCart.items || {};
//   this.totalQty = oldCart.totalQty || 0;
//   this.totalPrice = oldCart.totalPrice || 0;
//
//   this.add = function (item, id) {
//     let storedItem = this.items[id];
//     if (!storedItem) {
//       storedItem = this.items[id] = {item: item, qty: 0, price: 0};
//     }
//     storedItem.qty++;
//     storedItem.price = storedItem.item.price * storedItem.qty;
//     this.totalQty++;
//     this.totalPrice += storedItem.item.price;
//   };
//
//   this.reduceByOne = function (id) {
//     this.items[id].qty--;
//     this.items[id].price -= this.items[id].item.price;
//     this.totalQty--;
//     this.totalPrice -= this.items[id].item.price;
//
//     if(this.items[id].qty <= 0) {
//       delete this.items[id];
//     }
//   };
//
//   this.removeItem = function (id) {
//     this.totalQty -= this.items[id].qty;
//     this.totalPrice -= this.items[id].price;
//     delete this.items[id];
//   };
//
//   this.generateArray = function () {
//     const arr = [];
//     for (let id in this.items) {
//       arr.push(this.items[id]);
//     }
//     return arr;
//   };
// };