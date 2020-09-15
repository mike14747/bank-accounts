const router = require('express').Router();
const Account = require('../models/accounts');
const { postError, putError, deleteError, nothingUpdatedError } = require('./utils/errorMessages');
const { formatAccountData } = require('./utils/accountsFunctions');

router.get('/', async (req, res, next) => {
    try {
        const [data, error] = await Account.getAllAccounts();
        data ? res.json(formatAccountData(data)) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/:_id', async (req, res, next) => {
    try {
        const [data, error] = await Account.getAccountById(req.params._id);
        data ? res.json(formatAccountData(data)) : next(error);
    } catch (error) {
        next(error);
    }
});

router.get('/users/:_id', async (req, res, next) => {
    try {
        const [data, error] = await Account.getAccountsByUserId(req.params._id);
        data ? res.json(data) : next(error);
    } catch (error) {
        next(error);
    }
});

router.delete('/:_id', async (req, res, next) => {
    try {
        const [data, error] = await Account.deleteAccountById(req.params._id);
        if (error) return next(error);
        data && data.deletedCount === 1 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

router.delete('/users/:_id', async (req, res, next) => {
    try {
        const [data, error] = await Account.deleteAccountsByUserId(req.params._id);
        if (error) return next(error);
        data && data.deletedCount > 0 ? res.status(204).end() : res.status(400).json({ Error: deleteError });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
