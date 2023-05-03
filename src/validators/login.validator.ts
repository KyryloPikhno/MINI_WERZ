import Joi from "joi";

export const loginValidator = Joi.object({
    identifier: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.alphanum': 'The username should only contain alpha-numeric characters',
        'string.min': 'The username should have a minimum length of {#limit} characters',
        'string.max': 'The username should have a maximum length of {#limit} characters',
        'any.required': 'The username field is required',
        'string.empty': 'Please enter your username',
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().messages({
        'string.pattern.base': 'The password should contain only letters and numbers',
        'any.required': 'The password field is required',
        'string.empty': 'Please enter your password',
    })
});




