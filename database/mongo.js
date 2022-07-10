import 'dotenv/config'
import mongoose from 'mongoose'

const host = process.env.MONGO_HOST || '127.0.0.1'
const port = process.env.MONGO_PORT || 27017
const username = process.env.MONGO_USERNAME || 'user'
const password = process.env.MONGO_PASSWORD || 'secret'
const database = process.env.MONGO_DATABASE || 'default'
mongoose.Promise = global.Promise

export default {
  async connect() {
    const dsn = `mongodb://${username}:${password}@${host}:${port}/${database}`
    console.log('MongoDB DSN:', dsn)
    await mongoose.connect(dsn)
      .then(() => console.log('MongoDB Connection Successful!'))
      .catch(err => console.log(err));
    mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
    return mongoose.connection;
  },
  async disconnect() {
    await mongoose.connection.close()
  }
}