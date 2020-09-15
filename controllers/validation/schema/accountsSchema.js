const Joi = require('joi');
const { idError } = require('../../utils/errorMessages');

const accountsSchema = Joi.object({
    _id: Joi.optional(),
    user_id: Joi.optional(),
    account_name: Joi.string().min(1).required(),
    account_number: Joi.string().min(1).required(),
    institution: Joi.string().min(1).required(),
    account_type_id: Joi.optional(),
    opening_balance: Joi.number().precision(2).required(),
    transactions: Joi.array().required(),
});

const idSchema = Joi.object({
    _id: Joi.string().hex().length(24).messages({
        'string.base': idError,
        'string.hex': idError,
        'string.length': idError,
    }).required(),
});

module.exports = {
    accountsSchema,
    idSchema,
};
