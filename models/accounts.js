const db = require('../config/connectionPool').getDb();
const ObjectID = require('mongodb').ObjectID;

const Account = {
    getAllAccounts: async () => {
        try {
            // const result = await db.collection('accounts').find({}).sort({ _id: 1 }).toArray();
            const result = await db.collection('accounts').aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'userInfo',
                    },
                },
                {
                    $unwind: '$userInfo',
                },
                {
                    $lookup: {
                        from: 'account_types',
                        localField: 'account_type',
                        foreignField: '_id',
                        as: 'accountTypeInfo',
                    },
                },
                {
                    $unwind: '$accountTypeInfo',
                },
                {
                    $set: { type: '$accountTypeInfo.type' },
                },
                {
                    $unset: 'accountTypeInfo',
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'transactions',
                        foreignField: 'payees',
                        as: 'payeeName',
                    },
                },
            ]).project({ user_id: 0, account_type: 0, 'userInfo.password': 0, 'accountTypeInfo._id': 0 }).toArray();
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getAccountById: async (_id) => {
        try {
            const result = await db.collection('accounts').find({ _id: ObjectID(_id) }).toArray();
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getAccountsByUserId: async (_id) => {
        try {
            const result = await db.collection('accounts').find({ user_id: ObjectID(_id) }).toArray();
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    addNewAccount: async (paramsObj) => {
        try {
            const document = {

            };
            const result = await db.collection('accounts').insertOne(document);
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    updateAccountById: async (paramsObj) => {
        try {
            const queryParams = {
                _id: paramsObj._id,
            };
            const document = {

            };
            const result = await db.collection('accounts').updateOne({ _id: ObjectID(queryParams._id) }, { $set: document });
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    deleteAccountById: async (_id) => {

    },
    deleteAccountsByUserId: async (_id) => {

    },
};

module.exports = Account;

// db.collection('accounts').aggregate([
//     {
//         $lookup:
//         {
//             from: 'users',
//             localField: 'user_id',
//             foreignField: '_id',
//             as: 'userInfo',
//         },
//     },
// ]).toArray();
