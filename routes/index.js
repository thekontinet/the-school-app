const auth = require('../middlewares/auth')

const router = require('express').Router()

router.get('/', auth, function(req, res){
    res.send('api index')
})

module.exports = router