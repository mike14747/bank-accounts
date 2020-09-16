const router = require('express').Router();
const User = require('../models/user.js');
const { usersSchema, userIdSchema, payeesSchema, usernameSchema } = require('./validation/schema/usersSchema');
const { postError, putError, deleteError, nothingUpdatedError } = require('./utils/errorMessages');
const isUserIdValid = require('./validation/helpers/isUserIdValid');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await User.getAllUsers();
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:_id', async (req, res, next) => {
    try {
        await userIdSchema.validateAsync({ _id: req.params._id });
        const [data, error] = await User.getUserById(req.params._id);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/username/:username', async (req, res, next) => {
    try {
        await usernameSchema.validateAsync(req.params.username);
        const [data, error] = await User.getUserByUsername(req.params.username);
        data ? res.json(data) : next(error);
    } catch (error) {
        res.send(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: {
                first: req.body.name.first,
                last: req.body.name.last,
            },
        };
        await usersSchema.validateAsync(paramsObj);
        const [data, error] = await User.addNewUser(paramsObj);
        if (error) return next(error);
        data && data.insertedId ? res.status(201).json({ insertedId: data.insertedId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

router.post('/payees', async (req, res, next) => {
    try {
        const paramsObj = {
            _id: req.body._id,
            id: req.body.id,
            name: req.body.name,
        };
        await payeesSchema.validateAsync(paramsObj);
        await userIdSchema.validateAsync({ _id: paramsObj._id });
        const [data, error] = await User.addNewPayee(paramsObj);
        if (error) return next(error);
        data && data.modifiedCount === 1 ? res.status(201).json({ modifiedCount: data.modifiedCount }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        const paramsObj = {
            _id: req.body._id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            name: {
                first: req.body.name.first,
                last: req.body.name.last,
            },
        };
        await usersSchema.validateAsync(paramsObj);
        await userIdSchema.validateAsync({ _id: paramsObj._id });
        await isUserIdValid(paramsObj._id);
        const [data, error] = await User.updateUserById(paramsObj);
        if (error) return next(error);
        if (data && data.modifiedCount === 1) return res.status(204).end();
        if (data && data.modifiedCount === 0) return res.status(299).json({ warning: nothingUpdatedError });
        res.status(400).json({ Error: putError });
    } catch (error) {
        next(error);
    }
});

router.delete('/:_id', async (req, res, next) => {
    try {
        await userIdSchema.validateAsync({ _id: req.params._id });
        await isUserIdValid(req.params._id);
        const [data, error] = await User.deleteUserById(req.params._id);
        if (error) return next(error);
        data && data.deletedCount === 1 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
