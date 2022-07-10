import User from './../models/user.js'

const authenticated = async (req, res, next) => {
  // TODO: real auth
  req.user = req.user || await User.findOne()
  return next()
}

export default authenticated