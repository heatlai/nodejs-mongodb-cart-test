import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer;
export default {
  async connect () {
    if(!mongoServer) {
      mongoServer = await MongoMemoryServer.create();
    }
    const dsn = `${mongoServer.getUri()}test`
    await mongoose.connect(dsn, {});
    // console.log('Testing MongoDB Connected!')
    return mongoose.connection
  },
  async closeDatabase () {
    await mongoose.connection.close()
    await mongoServer.stop()
    // console.log('Testing MongoDB Close!')
  },
  async clearDatabase () {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany()
    }
    // console.log('Testing MongoDB Clear!')
  }
}