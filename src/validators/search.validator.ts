import Joi from "joi";

export const searchValidator = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        'string.name': 'The search name should only contain characters',
        'string.min': 'The search name should have a minimum length of {#limit} characters',
        'string.max': 'The search name should have a maximum length of {#limit} characters',
        'any.required': 'The search name field is required',
        'string.empty': 'Please enter your search name',
    })
});
