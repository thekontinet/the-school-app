const router = require('express').Router()
const _ = require('lodash')
const User = require('../models/user')
const Joi = require('joi')

router.post('/login', async function(req, res){
    const {email, password} =  req.body
    
    const {error} = validate(req.body)

    if(error){
        return res.status(400).send(error.message)
    }

    let user =  await User.findOne({email})

    if(!user){
        return res.status(401).send('Invalid credentials')
    }

    if(! (await user.verifyPassword(password))){
        return res.status(401).send('Invalid credentials')
    }

    const token = user.generateAccessToken()

    res.send(token)
})

function validate({email, password}){
    const Schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(18).required()
    })
    
    return Schema.validate({email, password})
}



module.exports = router