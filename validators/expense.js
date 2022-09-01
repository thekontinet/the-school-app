const Joi = require('joi')
const { schema } = require('../models/expense')


module.exports = function (description, amount, type) {
    const Schema = Joi.object({
            description: Joi.string().required().max(60),
            amount: Joi.number().required(),
            type: Joi.boolean().required()     
    })

    return Schema.validate({description, amount, type})
}

