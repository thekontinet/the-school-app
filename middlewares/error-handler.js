const winston = require('winston')

const errorHandler = function(err, req, res, next){
    winston.error(err.message, err)
    res.status(500).send(err.message)
}

module.exports = errorHandler