const Joi = require('joi');
const { idError, usernameError, passwordError } = require('../../utils/errorMessages');

const usersSchema = Joi.object({
    _id: Joi.optional(),
    username: Joi.string().min(6).max(15).messages({
        'string.base': usernameError,
        'string.min': usernameError,
        'string.max': usernameError,
    }).required(),
    password: Joi.string().min(6).max(20).messages({
        'string.base': passwordError,
        'string.min': passwordError,
        'string.max': passwordError,
    }).required(),
    email: Joi.string().email().required(),
    name: Joi.object({
        first: Joi.string().required(),
        last: Joi.string().required(),
    }),
    payees: Joi.array().required(),
});

const userIdSchema = Joi.object({
    _id: Joi.string().hex().length(24).messages({
        'string.base': idError,
        'string.hex': idError,
        'string.length': idError,
    }).required(),
});

const payeesSchema = Joi.object({
    _id: Joi.optional(),
    id: Joi.number().integer().min(0).required(),
    name: Joi.string().min(1).required(),
});

const payeeIdSchema = Joi.object({
    id: Joi.number().integer().min(0).required(),
});

const usernameSchema = Joi.object({
    username: Joi.string().min(6).max(15).messages({
        'string.base': usernameError,
        'string.min': usernameError,
        'string.max': usernameError,
    }).required(),
});

module.exports = {
    usersSchema,
    userIdSchema,
    payeesSchema,
    payeeIdSchema
    usernameSchema,
};
