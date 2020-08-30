const router = require('express').Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const { check, validationResult } = require('express-validator/check')
const sendError = require('../sendError')

function checkDate (value) {
  const date = Date.parse(value)
  if (!date) throw new Error('Date isn\'t valid.')

  return true
}

// @route   GET api/profile/me
// @desc    Get current authenticated user profile
// @access  Private
router.get(
  '/me',
  auth,
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id })

      if (!profile) {
        return sendError(res, 'There\'s no profile for this user.')
      }

      res.json(profile)
    } catch (error) {
      return sendError(res, 'Server Error', 500)
    }
  })

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  '/',
  auth,
  [
    check('bio').optional().isLength({ max: 140 }),
    check('website').optional().isLength({ max: 140 }),
    check('location').optional().isLength({ max: 140 }),
    check('birthday').optional().custom(checkDate)
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return sendError(res, errors.array())

    const user = req.user.id
    const { bio, website, location, birthday } = req.body
    const profileFields = { user, bio, website, location, birthday }

    try {
      let profile = await Profile.findOne({ user })

      if (profile) {
        console.log(`Profile ${profile.id} was update.`)
        profile = await Profile.findOneAndUpdate({ user }, { $set: profileFields }, { new: true })
      } else {
        profile = Profile(profileFields)
        await profile.save()
      }
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      sendError(res, 'Server Error', 500)
    }
  }
)

// @route   GET /api/aprofile
// @desc    GET all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find()
    res.json(profiles)
  } catch (error) {
    console.error(error.message)
    sendError(res, 'Server Error', 500)
  }
})

// @route   GET /api/porfile/user/:userId
// @desc    GET profile by user id
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId })
    res.json(profiles)
  } catch (error) {
    console.error(error.message)
    sendError(res, 'Server Error', 500)
  }
})

module.exports = router
