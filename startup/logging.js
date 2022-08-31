const winston = require('winston')

module.exports = function(){
    winston.handleExceptions(new winston.transports.File({filename: 'uncaughtExeption.log'}))

    process.on('unhandledRejection', function(ex){
        throw ex
    })

    if(process.env.NODE_ENV === 'development'){
        winston.add(winston.transports.Console)
    }else{
        winston.add(winston.transports.File, {filename: '.log'})
    }
}