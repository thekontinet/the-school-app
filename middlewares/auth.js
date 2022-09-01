const jwt = require('jsonwebtoken')
const config = require('config')

function auth(req, res, next){
    const token = req.header('x-auth-token')

    if (!token)  return res.status(401).send('Access denied. No token provided')

    const decode = jwt.verify(token, config.get('jwtPrivateKey'))
    try {
        req.user = decode
        next()
    } catch (error) {
        return res.status(400).send('Unauthorized token')
    }
}

module.exports = auth