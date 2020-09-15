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
                }, {
                    $unwind: '$userInfo',
                }, {
                    $lookup: {
                        from: 'account_types',
                        localField: 'account_type_id',
                        foreignField: '_id',
                        as: 'accountTypeInfo',
                    },
                }, {
                    $unwind: '$accountTypeInfo',
                }, {
                    $addFields: {
                        type: '$accountTypeInfo.type',
                        payees: '$userInfo.payees',
                    },
                }, {
                    $project: {
                        user_id: 0, account_type_id: 0, 'userInfo.password': 0, 'userInfo.payees': 0, accountTypeInfo: 0,
                    },
                },
            ]).toArray();
            return [result, null];
        } catch (error) {
            return [null, error];
        }
    },
    getAccountById: async (_id) => {
        try {
            // const result = await db.collection('accounts').find({ _id: ObjectID(_id) }).toArray();
            const result = await db.collection('accounts').aggregate([
                {
                    $match: { _id: ObjectID(_id) },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'userInfo',
                    },
                }, {
                    $unwind: '$userInfo',
                }, {
                    $lookup: {
                        from: 'account_types',
                        localField: 'account_type_id',
                        foreignField: '_id',
                        as: 'accountTypeInfo',
                    },
                }, {
                    $unwind: '$accountTypeInfo',
                }, {
                    $addFields: {
                        type: '$accountTypeInfo.type',
                        payees: '$userInfo.payees',
                    },
                }, {
                    $project: {
                        user_id: 0, account_type_id: 0, 'userInfo.password': 0, 'userInfo.payees': 0, accountTypeInfo: 0,
                    },
                },
            ]).toArray();
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
                user_id: paramsObj.user_id,
                account_name: paramsObj.account_name,
                account_number: paramsObj.account_number,
                institution: paramsObj.institution,
                account_type_id: paramsObj.account_type_id,
                opening_balance: paramsObj.opening_balance,
                transactions: require.body.transactions,
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
