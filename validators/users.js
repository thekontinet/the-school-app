const Joi = require('joi')

module.exports = function({name, email, password}){
    const Schema = Joi.object({
        name: Joi.string().required().max(100),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(18).required()
    })

    return Schema.validate({name, email, password})
}