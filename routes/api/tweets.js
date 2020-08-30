const router = require('express').Router()

// @route   GET api/tweet
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Tweets route'))

module.exports = router
