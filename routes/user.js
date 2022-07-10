import express from 'express'
import User from './../models/user.js'

const router = express.Router()

router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  }
  catch (e) {
    console.error(e)
    res.status(400).json({ message: e.message })
  }
})

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.send(user)
  }
  catch (e) {
    res.status(400).json({ message: e.message })
  }
})

export default router