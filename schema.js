const Joi = require('joi');

module.exports.schemaValidation = Joi.object({
    Listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        location: Joi.string().required().min(0),
        price: Joi.number().allow("", null)
    }).required()
})

