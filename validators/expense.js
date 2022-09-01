const Joi = require('joi')
const { schema } = require('../models/expense')


module.exports = function ({description, amount, income}) {
    const Schema = Joi.object({
            description: Joi.string().required().max(60),
            amount: Joi.number().required(),
            income: Joi.boolean().required()     
    })

    return Schema.validate({description, amount, income})
}

