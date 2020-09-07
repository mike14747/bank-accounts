const User = require('../../../models/user');

const isUserIdValid = async (_id) => {
    const [data, error] = await User.getUserById({ _id });
    if (error) throw new Error(error);
    if (data && data.length !== 1) throw new RangeError('user_id ' + _id + ' does not exist!');
};

module.exports = isUserIdValid;
