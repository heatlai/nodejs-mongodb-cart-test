import mongoose from 'mongoose'

const { Schema } = mongoose
const schema = new Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true },
}, {
  methods: {
    async reload() {
      const record = await this.findById(this._id);
      Object.assign(this, record);
      return record;
    }
  }
})

const Product = mongoose.model('Product', schema)
export default Product