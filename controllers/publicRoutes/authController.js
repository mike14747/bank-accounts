const router = require('express').Router();

router.get('/', async (req, res, next) => {
    res.status(200).send('Sending this from the /api/auth base route');
});

module.exports = router;
