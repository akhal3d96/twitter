const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator/check')
const config = require('config')
const expiresIn = require('../../config/expire')
const auth = require('../../middleware/auth')
const sendError = require('../sendError')

router.get(
  '/',
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      res.json(user)
    } catch (error) {
      console.error(error.message)
      return sendError(res, 'Server Error', 500)
    }

    User.findById()
  }
)

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { email, password } = req.body

    try {
      // See if user exist
      const user = await User.findOne({ email })
      if (!user) return sendError(res, 'Invalid user cerdentials')

      const isPasswordMatch = await bcrypt.compare(password, user.password)

      if (!isPasswordMatch) return sendError(res, 'Invalid user cerdentials')

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload,
        config.get('jwtSecret'),
        { expiresIn },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )

      // Return jsonwebtoken
      // res.send(`User ${user.id} is registered successfully.`)
    } catch (error) {
      console.error(error.message)
      res.status(500)
    }
  })

module.exports = router
