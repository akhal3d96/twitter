const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const sendError = require('../sendError')
const Tweet = require('../../models/Tweet')

// @route   POST api/tweet
// @desc    create a tweet
// @access  Private
router.post('/',
  [
    auth,
    [
      check('text', 'Text is required').notEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) return sendError(res, errors.array())

    const user = req.user.id

    try {
      const newTweet = Tweet({
        text: req.body.text,
        user
      })

      const tweet = await newTweet.save()
      res.json(tweet)
    } catch (error) {
      console.error(error.message)
      return sendError(res, 'Server Error', 500)
    }

    res.send('Tweets route')
  }
)

// @route   GET /api/tweet/tweetID
// @desc    Get a tweet
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ date: -1 })
    res.json(tweets)
  } catch (error) {
    console.error(error.message)
    return sendError(res, 'Server Error', 500)
  }
})

// @route   GET /api/tweet/tweetID
// @desc    Get a tweet
// @access  Public
router.get('/:tweetId', async (req, res) => {
  const errorMsg = 'Tweet doesn\'t exist.'
  try {
    const tweet = await Tweet.findById(req.params.tweetId)

    if (!tweet) return sendError(res, errorMsg)

    res.json(tweet)
  } catch (error) {
    console.log(error)
    if (error.kind === 'ObjectId') {
      return sendError(res, errorMsg)
    }
    console.error(error.message)
    return sendError(res, 'Server Error', 500)
  }
})

// @route   POST api/tweet
// @desc    delete a tweet
// @access  Private
router.delete(
  '/:tweetId',
  auth,
  async (req, res) => {
    const errorMsg = 'Tweet doesn\'t exist.'
    try {
      const tweet = await Tweet.findById(req.params.tweetId)

      if (!tweet) return sendError(res, errorMsg)

      if (tweet.user.toString() !== req.user.id) return sendError(res, 'You aren\'t allowed to perform this action')

      await tweet.deleteOne()
      res.json({ msg: `Tweet ${tweet.id} was deleted successfully` })
    } catch (error) {
      console.error(error.message)
      if (error.kind === 'ObjectId') {
        return sendError(res, errorMsg)
      }
      return sendError(res, 'Server Error', 500)
    }
  }
)

module.exports = router
