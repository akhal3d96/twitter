const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const config = require('config')
const expiresIn = require('../../config/expire')

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { name, email, password } = req.body

    try {
      // See if user exist
      let user = await User.findOne({ email })
      if (user) return res.status(400).json({ errors: [{ msg: 'User already exists' }] })

      user = new User({ name, email, password })

      // Encrypt password
      const salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(password, salt)

      await user.save()

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
