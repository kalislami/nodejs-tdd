import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().min(3).max(100).alphanum().required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    user_type: Joi.any().valid('default'),
    nik: Joi.string().max(16).min(12).pattern(/^[0-9]+$/, 'numbers')
});

const registerOauthValidation = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    name: Joi.string().max(100).required(),
    user_type: Joi.any().valid('oauth'),
    oauth_id: Joi.string().max(100).required()
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.string().max(100).required();

// const updateUserValidation = Joi.object({
//     username: Joi.string().max(100).required(),
//     password: Joi.string().max(100).optional(),
//     name: Joi.string().max(100).optional()
// })

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    registerOauthValidation
    // updateUserValidation
}