const router = require('express').Router();
const Account = require('../models/accounts');
const { postError, putError, deleteError, nothingUpdatedError } = require('./utils/errorMessages');
const { formatAccountData, findNextPayeeId } = require('./utils/accountsFunctions');
const { accountsSchema, idSchema } = require('./validation/schema/accountsSchema');

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

router.post('/', async (req, res, next) => {
    try {
        const paramsObj = {
            user_id: req.body.user_id,
            account_name: req.body.account_name,
            account_number: req.body.account_number,
            institution: req.body.institution,
            account_type_id: req.body.account_type_id,
            opening_balance: req.body.opening_balance,
            transactions: req.body.transactions,
        };
        await accountsSchema.validateAsync(paramsObj);
        await idSchema.validateAsync({ _id: paramsObj.user_id });
        await idSchema.validateAsync({ _id: paramsObj.account_type_id });
        const [data, error] = await Account.addNewAccount(paramsObj);
        if (error) return next(error);
        data && data.insertedId ? res.status(201).json({ insertedId: data.insertedId }) : res.status(400).json({ Error: postError });
    } catch (error) {
        next(error);
    }
});

router.put('/', async (req, res, next) => {
    try {
        res.end();
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
