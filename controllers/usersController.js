const router = require('express').Router();
const User = require('../models/user.js');

router.get('/', async (req, res, next) => {
    try {
        const data = await User.getAllUsers();
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        res.send(error);
    }
});

router.get('/id/:id', async (req, res, next) => {
    try {
        const data = await User.getUserById(req.params.id);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        res.send(error);
    }
});

router.get('/username/:username', async (req, res, next) => {
    try {
        const data = await User.getUserByUsername(req.params.username);
        console.log('data:', data);
        data[0] ? res.json(data[0]) : next(data[1]);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
