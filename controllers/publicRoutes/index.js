const router = require('express').Router();

router.use('/auth', require('./authController'));

module.exports = router;
