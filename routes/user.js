const router = require('express').Router()
const _ = require('lodash')
const User = require('../models/user')
const registerValidator = require('../validators/users')

router.post('/', async function(req, res){
    const {name, email, password} = req.body
    const {error} = registerValidator({name, email, password})

    if(error){
        return res.status(400).send(error.message)
    }

    if(await User.findOne({email})){
        return res.status(400).send('Email already exist')
    }

    let user =  await User.create({name, email, password})
    await user.save()

    return res.header('x-auth-token', user.generateAccessToken())
                .send(_.pick(user, ['_id', 'name', 'email']))
})

module.exports = router
